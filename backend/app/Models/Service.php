<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'freelancer_id',
        'title',
        'description',
        'price'
    ];
    public function freelancer(){
        return $this->belongsTo(User::class,'freelancer_id');
    }
    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }
}
