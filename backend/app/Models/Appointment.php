<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'availability_id',
        'client_id',
        'status'
    ];

    public function availability()
    {
        return $this->belongsTo(Availability::class,'availability_id');
    }
    public function client()
    {
        return $this->belongsTo(User::class,'client_id');
    }
    public $timestamps = false;
}
