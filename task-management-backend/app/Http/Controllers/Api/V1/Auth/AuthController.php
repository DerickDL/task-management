<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\SignUpRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signUp(SignUpRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => $user
        ], 201); 
    }

    public function login(LoginRequest $request)
    {
        $email = $request->email;
        $user = User::where('email', $email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Invalid credentials'
            ], 422);
        }

        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => $user
        ], 200); 
    }

    public function logout(Request $request)
    {
        $user = auth()->user();
        return $user->currentAccessToken();
        $user->currentAccessToken()->delete();

        return response()->json([], 204);
    }
}
