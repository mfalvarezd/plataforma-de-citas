<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'client_id',
        'freelancer_id',
        'status'
    ];
    public function client(){
        return $this->belongsTo(User::class,'client_id');

    }
    public function freelancer(){
        return $this->belongsTo(User::class,'freelancer_id');
    }
}
