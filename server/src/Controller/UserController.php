<?php


namespace App\Controller;

use App\Entity\User;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteContext;

final class UserController extends BaseController
{

    const APPLICATION_ADMIN_ID = 1;

    public function index(Request $request, Response $response): Response
    {
        $users = $this->em->getRepository(User::class)->findAll();
        return $this->responseToJson($response, ['status' => true, 'data' => $users]);
    }


    public function create(Request $request, Response $response): Response
    {
        $user = $this->hydrator->hydrate(User::class, $request->getParsedBody());
        $user->setPassword(password_hash($user->getPassword(), PASSWORD_BCRYPT));
        $this->em->persist($user);
        $this->em->flush();
        return $this->responseToJson($response, $payload = ["status" => true, "message" => 'Row added successfully']);
    }

    public function update(Request $request, Response $response): Response
    {

        $updateInfo = $request->getParsedBody();

        if ($this->isUpdateNotAllowed($updateInfo)) {
            return $this->responseToJson($response, ["status" => false, "message" => "Can't update cell"]);
        }

        $sql = "UPDATE " . User::class . " s SET s." . $updateInfo['name'] . " = :value where s.id = :id ";
        $query = $this->em->createQuery($sql);
        $query->setParameter('value', $updateInfo['value']);
        $query->setParameter('id', $updateInfo['id']);
        $query->getResult();
        $this->em->flush();
        return $this->responseToJson($response, ["status" => true, "message" => 'Row updated successfully']);
    }

    private function isUpdateNotAllowed(array $updateInfo): bool
    {
        $adminUpdatableFields = ['username', 'name'];
        $userUpdatableFields = ['active', 'admin'];

        $notAdminUpdatableField = !in_array($updateInfo["name"], $adminUpdatableFields);
        $notUserUpdatableField = $notAdminUpdatableField && !in_array($updateInfo["name"], $userUpdatableFields);

        $applicationAdmin = $this->isApplicationAdmin($updateInfo['id']);

        return ($applicationAdmin && $notAdminUpdatableField) || $notUserUpdatableField;

    }

    private function isApplicationAdmin(int $userId): bool
    {
        return self::APPLICATION_ADMIN_ID === $userId;
    }

    public function delete(Request $request, Response $response): Response
    {
        $userId = RouteContext::fromRequest($request)->getRoute()->getArgument('id');

        if ($this->isApplicationAdmin($userId)) {
            return $this->responseToJson($response, ["status" => false, "message" => "Can't delete application admin"]);
        }

        $user = $this->em->getRepository(User::class)->find($userId);
        $this->em->remove($user);
        $this->em->flush();
        return $this->responseToJson($response, ['status' => true, 'message' => 'Row Successfully deleted']);
    }


}
