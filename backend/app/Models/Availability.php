<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Availability extends Model
{
    use HasFactory;

    protected $fillable = [
        'freelancer_id',
        'date',
        'start_time',
        'end_time',
        'is_booked'
    ];

    public function freelancer()
    {
        return $this->belongsTo(User::class,'freelancer_id');
    }

    public $timestamps = true;

}
