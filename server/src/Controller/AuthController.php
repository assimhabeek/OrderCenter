<?php

namespace App\Controller;

use App\Entity\User;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use PsrJwt\Factory\Jwt;
use ReallySimpleJWT\Exception\ValidateException;

final class AuthController extends BaseController
{

    public function login(Request $request, Response $response, array $args = []): Response
    {
        $username = $request->getParsedBody()["username"];
        $password = $request->getParsedBody()["password"];
        $dbUser = $this->em->getRepository(User::Class)->findOneBy(['username' => $username, 'active' => true]);

        if ($dbUser === null || !password_verify($password, $dbUser->getPassword())) {
            return $this->responseToJson($response, ["status" => false, "message" => "Wrong password or username"]);
        }

        $jwt = new Jwt();
        $secret = $this->setting['JWT_SECRET'];
        try {
            $token = $jwt->builder()->setSecret($secret)
                ->setPayloadClaim("id", $dbUser->getId())
                ->setPayloadClaim("username", $dbUser->getUsername())
                ->setPayloadClaim("admin", $dbUser->getAdmin())
                ->setPayloadClaim("active", $dbUser->getActive())
                ->setPayloadClaim("name", $dbUser->getName())
                ->build()
                ->getToken();
        } catch (ValidateException $e) {
            return $this->responseToJson($response, ["status" => false, "message" => "Could not proceed with login"]);
        }

        return $this->responseToJson($response, ["status" => true, "data" => $token]);
    }

    public function isLoggedIn(Request $request, Response $response): Response
    {
        $decodeJwt = $this->decodeJwt($request);
        $user = $decodeJwt != null ? $this->em->getRepository(User::Class)->findOneByUsername($decodeJwt['username']) : null;
        $loggedInMessage = ["status" => true, "data" => $user];
        $notLoggedInMessage = ["status" => false, "message" => "Not logged In"];
        $message = $user === null ? $notLoggedInMessage : $loggedInMessage;
        return $this->responseToJson($response, $message);
    }

    public function decodeJwt(Request $request): ?array
    {
        $tokeHeader = $this->setting['AUTH_TOKEN_HEADER'];
        $header = $request->getHeaderLine($tokeHeader);
        $jwt = new Jwt();
        $jwtSecret = $this->setting['JWT_SECRET'];
        return $header ? $jwt->parser($header, $jwtSecret)->parse()->getPayload() : null;
    }

    public function getCurrentUser(Request $request): ?User
    {
        $decodeJwt = $this->decodeJwt($request);
        return $decodeJwt ? $this->em->getRepository(User::Class)->findOneByUsername($decodeJwt['username']) : null;
    }

    public function isAdmin(Request $request): bool
    {
        $user = $this->getCurrentUser($request);
        return $user != null && $user->getAdmin();
    }


}
