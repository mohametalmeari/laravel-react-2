<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $data = $request->validated();
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json(['token' => $token], 201);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $data = $request->validated();
            if (! Auth::attempt($data)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $user = Auth::user();
            /** @var User $user */
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json(['token' => $token], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            $user->currentAccessToken()->delete();
            return response()->json("", 204);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function user(Request $request)
    {
        try {
            return $request->user();
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }
}
