<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;

use Illuminate\Http\Request;


class UserController extends Controller
{

    public function store(AuthRequest $request)
    {
        $validatedData = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',

            ],
            'localisation' => [
                'required',
                'string',
                'max:255',

            ],
            'phone' => [
                'required',
                'string',
                'max:255',

            ],
            'role_id' => 1,
            'adresse'  => [
                'required',
                'string',
                'max:255',

            ],
            'rip_bancaire' =>
            [
                'required',
                'string',
                'max:255',

            ],
            'email' =>
            [
                'required',
                'string',
                'max:255',

            ],
            'password' =>   [
                'required',
                'string',
                'max:255',

            ],




        ]);

        $user = new User();
        $user->name = $validatedData['name'];


        $user->save();

        return response()->json(['message' => 'user created successfully.']);
    }
}
