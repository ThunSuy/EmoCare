<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelfTalk extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'group_id', 'message', 'response'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
