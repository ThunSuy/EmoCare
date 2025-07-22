<?php

namespace App\Repositories;

use App\Models\SelfTalk;

class SelfTalkRepository implements SelfTalkRepositoryInterface
{
    public function getAllByUser($userId)
    {
        return SelfTalk::where('user_id', $userId)
            ->orderBy('created_at', 'asc')
            ->get();
    }

    public function createMany($userId, $groupId, $message, array $responses)
    {
        $result = [];
        foreach ($responses as $response) {
            $result[] = SelfTalk::create([
                'user_id' => $userId,
                'group_id' => $groupId,
                'message' => $message,
                'response' => trim($response),
            ]);
        }

        return collect($result);
    }
}
