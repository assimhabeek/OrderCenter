<?php


namespace App\Controller;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ShopifyConnector
{
    private $setting;

    public function __construct(ContainerInterface $container)
    {
        $this->setting = $container->get('settings');
    }


    public function install(Request $request, Response $response, array $args)
    {
        $shop = $request->getQueryParams()['shop'];
        $install_url = "https://" . $shop . "/admin/oauth/authorize?client_id=" . API_KEY . "&scope=" . SCOPES . "&redirect_uri=" . urlencode(REDIRECTION_URL);
        return $response->withHeader("location", $install_url)->withStatus(301);
    }

    public function generateToken(Request $request, Response $response, array $args)
    {
        $params = $request->getQueryParams();
        $hmac = $request->getQueryParams()['hmac'];
        $params = array_diff_key($params, array('hmac' => ''));
        ksort($params);
        $computed_hmac = hash_hmac('sha256', http_build_query($params), SHARED_SECRET);

        if (hash_equals($hmac, $computed_hmac)) {

            $query = array(
                "client_id" => API_KEY, // Your API key
                "client_secret" => SHARED_SECRET, // Your app credentials (secret key)
                "code" => $params['code'] // Grab the access key from the URL
            );

            $access_token_url = "https://" . $params['shop'] . "/admin/oauth/access_token";

            // Configure curl client and execute request
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_URL, $access_token_url);
            curl_setopt($ch, CURLOPT_POST, count($query));
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($query));
            $result = curl_exec($ch);
            curl_close($ch);

            $result = json_decode($result, true);
            $access_token = $result['access_token'];

            $fp = fopen(TOKEN_FILE, "w+");
            fwrite($fp, $params['shop']);
            fwrite($fp, "\n");
            fwrite($fp, $access_token);
            fclose($fp);
            $head_to_login = CURRENT_HOST . '/login?installed=1';
        } else {
            $head_to_login = CURRENT_HOST . '/login?installed=-1';
        }
        return $response->withHeader("location", $head_to_login)->withStatus(301);
    }

    public function createWebhooks(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        $baseURL = $this->setting['CURRENT_SITE_ROOT'];

        $webhooks = [
            $this->generateWebhook("orders/create", $baseURL . '/shopify/orders/create'),
            $this->generateWebhook("orders/updated", $baseURL . '/shopify/orders/updated'),
            $this->generateWebhook("orders/edited", $baseURL . '/shopify/orders/edited'),
            $this->generateWebhook("orders/fulfilled", $baseURL . '/shopify/orders/fulfilled'),
            $this->generateWebhook("orders/partially_fulfilled", $baseURL . '/shopify/orders/partially_fulfilled'),
            $this->generateWebhook("orders/cancelled", $baseURL . '/shopify/orders/cancelled'),
            $this->generateWebhook("orders/delete", $baseURL . '/shopify/orders/delete'),
        ];

        $result = [];
        foreach ($webhooks as $wh) {
            $payload = $this->shopifyCall(
                "/admin/api/2020-10/webhooks.json",
                $wh,
                'POST');
            array_push($result, json_decode($payload['response'], TRUE));
        }

        $response->getBody()->write(json_encode(['status' => true, 'data' => $result]));
        return $response;

    }


    private static function generateWebhook($topic, $address, $format = "json")
    {
        return array(
            'webhook' => array(
                'topic' => $topic,
                'address' => $address,
                'format' => $format
            )
        );
    }

    public function getWebhooks(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        $payload = $this->shopifyCall("/admin/api/2020-10/webhooks.json", array());
        $webhooks = json_decode($payload['response'], TRUE)['webhooks'];
        $response->getBody()->write(json_encode(['status' => true, 'data' => $webhooks]));
        return $response;
    }


    public function shopifyCall($apiEndpoint, $query = array(), $method = 'GET', $requestHeaders = array())
    {

        $shop = $this->setting['SHOPIFY_SHOP'];
        $token = $this->setting['SHOP_SECRET'];
        $url = "https://" . $shop . $apiEndpoint;

        if (!is_null($query) && in_array($method, array('GET'))) $url = $url . "?" . http_build_query($query);

        // Configure cURL
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_HEADER, TRUE);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, TRUE);
        curl_setopt($curl, CURLOPT_MAXREDIRS, 3);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_USERAGENT, 'ORDERS_CENTER APP');
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);

        // Setup headers
        $requestHeaders[] = "";
        if (!is_null($token)) $requestHeaders[] = "X-Shopify-Access-Token: " . $token;
        curl_setopt($curl, CURLOPT_HTTPHEADER, $requestHeaders);

        if ($method != 'GET' && in_array($method, array('POST', 'PUT'))) {
            if (is_array($query)) $query = http_build_query($query);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $query);
        }

        // Send request to Shopify and capture any errors
        $response = curl_exec($curl);
        $error_number = curl_errno($curl);
        $error_message = curl_error($curl);

        // Close cURL to be nice
        curl_close($curl);

        // Return an error is cURL has a problem
        if ($error_number) {
            return $error_message;
        } else {

            // No error, return Shopify's response by parsing out the body and the headers
            $response = preg_split("/\r\n\r\n|\n\n|\r\r/", $response, 2);

            // Convert headers into an array
            $headers = array();
            $header_data = explode("\n", $response[0]);
            $headers['status'] = $header_data[0]; // Does not contain a key, have to explicitly set
            array_shift($header_data); // Remove status, we've already set it above
            foreach ($header_data as $part) {
                $h = explode(":", $part);
                $headers[trim($h[0])] = trim($h[1]);
            }

            // Return headers and Shopify's response
            return array('headers' => $headers, 'response' => $response[1]);

        }

    }


}
