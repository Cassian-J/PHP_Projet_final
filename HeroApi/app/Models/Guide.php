<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guide extends Model
{
    use HasFactory;

    protected $table = 'guide';
    protected $primaryKey = 'UserUuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['SuperHeroUuid','Weakness','Strength','Dengerousness','DestroyingPlan'];
}
