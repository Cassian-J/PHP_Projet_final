<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guide extends Model
{
    use HasFactory;

    protected $table = 'guide';
    protected $primaryKey = 'SuperHeroUuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['SuperHeroUuid','UserUuid','Weakness','Strength','Dengerousness','DestroyingPlan'];
}
