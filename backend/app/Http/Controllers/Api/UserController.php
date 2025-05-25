<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        $users = User::orderBy('id')->paginate($perPage);
        return UserResource::collection($users);
    }

    public function destroy($id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Пользователь не найден'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Пользователь удалён']);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        $user->update($validated);

        return response()->json($user);
    }
}
