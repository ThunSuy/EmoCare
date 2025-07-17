<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\SelfTalk;
use App\Http\Resources\SelfTalkResource;
use Illuminate\Support\Str;

class SelfTalkController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $talks = SelfTalk::where('user_id', $user->id)
            ->orderBy('created_at', 'asc') // quan trọng để đúng thứ tự
            ->get();

        return SelfTalkResource::collection($talks);
    }



    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $user = $request->user();
        $message = $request->message;

        // Prompt chuẩn hóa
        $prompt = <<<PROMPT
Tôi đang tự trò chuyện với chính mình. Đây là tâm sự tôi vừa viết:

{$message}

Hãy đáp lại như một lời tự nhủ dịu dàng và chân thành, không xưng “bạn” hay “mình-mình”.  
– Tối đa 6 câu.  
– Chia ý rõ ràng: cách nhau ít nhất một dòng trống.  
– Không đưa lời khuyên y tế hay phán xét.  
– Giữ giọng điệu khích lệ, nhẹ nhàng, thực tế.
– Tùy vào lời thoại, bối cảnh của người dùng, bạn nên xúc tích hoặc diễn dãi.Đừng lèm bèm khi không cần thiết.
PROMPT;

        // Gọi Gemini
        $geminiResponse = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-goog-api-key' => env('GEMINI_API_KEY'),
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', [
            'contents' => [[
                'parts' => [['text' => $prompt]]
            ]]
        ]);

        $text = optional($geminiResponse->json('candidates')[0]['content']['parts'][0])['text']
            ?? 'Chậm lại một chút cũng không sao. Cố gắng vậy là tốt rồi.';

        // Tách phản hồi thành các đoạn theo dòng trống
        $chunks = array_filter(preg_split("/\n{2,}/", $text));

        $responses = [];
        $group_id = (string) Str::uuid();

        foreach ($chunks as $chunk) {
            $responses[] = SelfTalk::create([
                'user_id' => $user->id,
                'group_id' => $group_id,
                'message' => $message,
                'response' => trim($chunk),
            ]);
        }

        return SelfTalkResource::collection(collect($responses));
    }
}
