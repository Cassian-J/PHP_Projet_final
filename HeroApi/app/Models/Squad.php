<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Squad extends Model
{
    use HasFactory;

    protected $table = 'squad';
    protected $primaryKey = 'SquadUuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['SquadUuid','UserUuid','SquadName'];
}
