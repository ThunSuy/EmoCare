<?php

namespace App\Repositories;

interface SelfTalkRepositoryInterface
{
    public function getAllByUser($userId);
    public function createMany($userId, $groupId, $message, array $responses);
}
