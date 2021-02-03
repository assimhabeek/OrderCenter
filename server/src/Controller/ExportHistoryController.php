<?php


namespace App\Controller;

use App\Entity\ExportHistory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteContext;
use Slim\Psr7\Stream;

final class ExportHistoryController extends BaseController
{


    public function index(Request $request, Response $response, array $args = []): Response
    {
        $exportHistory = $this->em->getRepository(ExportHistory::class)->findAll();
        return $this->responseToJson($response, ['status' => true, 'data' => $exportHistory]);
    }


    public function create(Request $request, Response $response, array $args = []): Response
    {
        $exportHist = $this->hydrator->hydrate(ExportHistory::class, $request->getParsedBody());
        $this->em->persist($exportHist);
        $this->em->flush();
        return $this->responseToJson($response, $payload = ["status" => true, "message" => 'Row added successfully']);
    }

    public function update(Request $request, Response $response, array $args = []): Response
    {

        $updateInfo = $request->getParsedBody();
        $sql = "UPDATE " . ExportHistory::class . " s SET s." . $updateInfo['name'] . " = :value where s.id = :id ";
        $query = $this->em->createQuery($sql);
        $query->setParameter('value', $updateInfo['value']);
        $query->setParameter('id', $updateInfo['id']);
        $query->getResult();
        $this->em->flush();
        return $this->responseToJson($response, ["status" => true, "message" => 'Row updated successfully']);
    }


    public function delete(Request $request, Response $response, array $args = []): Response
    {
        $exportHistId = RouteContext::fromRequest($request)->getRoute()->getArgument('id');
        $exportHist = $this->em->getRepository(ExportHistory::class)->find($exportHistId);
        $this->em->remove($exportHist);
        $this->em->flush();
        return $this->responseToJson($response, ['status' => true, 'message' => 'Row Successfully deleted']);
    }

    public function download(Request $request, Response $response, array $args = [])
    {
        $exportHist = $this->em->getRepository(ExportHistory::class)->find($request->getQueryParams()['id']);
        return $this->downloadFile($response, $exportHist);
    }

    public function downloadFile($response, ExportHistory $exportHist): Response
    {
        if ($exportHist->getFileUrl() == null || !file_exists($exportHist->getFileUrl())) {
            return $this->responseToJson($response, ["status" => false, "message" => "File Not Found"])->withStatus(404);
        }

        $openedFile = fopen($exportHist->getFileUrl(), 'rb');
        $stream = new Stream($openedFile);

        return $response->withBody($stream)
            ->withHeader('Content-Disposition', 'attachment;')
            ->withHeader('Content-Type', mime_content_type($exportHist->getFileUrl()))
            ->withHeader('Content-Length', filesize($exportHist->getFileUrl()))
            ->withHeader('Access-Control-Expose-Headers', 'X-File-Name')
            ->withHeader('X-File-Name', $exportHist->getFileName());
    }

}
