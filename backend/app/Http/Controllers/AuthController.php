<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

/**
 * @param AuthRequest $request
 * @return JsonResponse
 */

class AuthController extends Controller
{
    final  public function login(AuthRequest $request): JsonResponse
    {
        $user = (new User())->getUserByEmailOrPhone($request->all());

        if ($user && Hash::check($request->input('password'), $user->password)) {
            $user_data['token'] = $user->createToken($user->email)->plainTextToken;
            $user_data['name'] = $user->name;
            $user_data['email'] = $user->email;
            $user_data['phone'] = $user->phone;
            return response()->json($user_data);
        }
        throw ValidationException::withMessages([
            'email' => ['the provider credentials are incorrect']
        ]);
    }

    /**
     * @return JsonResponse
     */
    final public function logout(): JsonResponse
    {
        auth()->user()->currentAccessToken()->delete();
        return response()->json(['msg' => 'You have successfully logged out']);
    }


    final public function update(AuthRequest $request, $id)
    {
        $user = User::where('email', $id)->first();

        if ($user) {
            if ($request->filled('name')) {
                $user->name = $request->input('name');
            }

            if ($request->filled('password')) {
                $user->password = $request->input('password');
            }

            if ($request->filled('mail')) {
                $user->email = $request->input('mail');
            }

            if ($request->filled('phone')) {
                $user->phone = $request->input('phone');
            }

            $user->save();
        }
    }
}
