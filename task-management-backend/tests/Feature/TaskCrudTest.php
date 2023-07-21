<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Task;
use App\Models\User;

class TaskCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_tasks(): void
    {
        $user = User::factory()->create();
        Task::factory(15)->create(['user_id' => $user->id]);

        $response = $this->get('/api/v1/tasks');

        $response->assertStatus(200);
        $response->assertJsonCount(15, 'data');
    }

    public function test_get_all_tasks_sorted_in_ascending_order_by_created_date(): void
    {
        $user = User::factory()->create();
$task1st = Task::factory()->create(['user_id' => $user->id, 'created_at' => '2023-07-21']);
        $task2nd = Task::factory()->create(['user_id' => $user->id, 'created_at' => '2023-07-22']);
        $task3rd = Task::factory()->create(['user_id' => $user->id, 'created_at' => '2023-07-23']);
        $response = $this->get('/api/v1/tasks?sortBy=created_at&sortOrder=asc');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
        $response->assertJsonPath('data.0.id', $task1st->id);
        $response->assertJsonPath('data.1.id', $task2nd->id);
        $response->assertJsonPath('data.2.id', $task3rd->id);
    }

    public function test_get_all_tasks_sorted_in_descending_order_by_created_date(): void
    {
        $user = User::factory()->create();
        $task1st = Task::factory()->create(['user_id' => $user->id, 'created_at' => '2023-07-21']);
        $task2nd = Task::factory()->create(['user_id' => $user->id, 'created_at' => '2023-07-22']);
        $task3rd = Task::factory()->create(['user_id' => $user->id, 'created_at' => '2023-07-23']);

        $response = $this->get('/api/v1/tasks?sortBy=created_at&sortOrder=desc');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
        $response->assertJsonPath('data.2.id', $task1st->id);
        $response->assertJsonPath('data.1.id', $task2nd->id);
        $response->assertJsonPath('data.0.id', $task3rd->id);
    }

    public function test_search_task_using_title_should_match(): void 
    {
        $user = User::factory()->create();
        $task1st = Task::factory()->create(['user_id' => $user->id, 'title' => 'Task 1']);
        $task2nd = Task::factory()->create(['user_id' => $user->id, 'title' => 'Task 2']);

        $response = $this->get('/api/v1/tasks?sortBy=created_at&sortOrder=desc&title=Task 2');

        $response->assertStatus(200);
        $response->assertJsonPath('data.0.id', $task2nd->id);

    }

    public function test_create_a_task_successfully(): void
    {
        $user = User::factory()->create();
        $task = [
            'user_id' => $user->id,
            'title' => 'Task 1',
            'description' => 'Some description'
        ];

        $response = $this->post('/api/v1/task', $task);

        $response->assertStatus(201);
    }

    public function test_task_creation_failure_due_to_missing_user_id(): void
    {
        $task = [
            'title' => 'Task 1',
            'description' => 'Some description'
        ];

        $response = $this->postJson('/api/v1/task', $task);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('user_id');
    }

    public function test_task_creation_failure_due_to_missing_title(): void
    {
        $user = User::factory()->create();
        $task = [
            'user_id' => $user->id,
            'description' => 'Some description'
        ];

        $response = $this->postJson('/api/v1/task', $task);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('title');
    }

    public function test_update_task_successfully(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $route = '/api/v1/task/' . $task->id;
        $response = $this->putJson($route, [
            'title' => 'Updated Title',
            'description' => $task->description,
            'status'    => 'COMPLETED'
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('data.title', 'Updated Title');
        $response->assertJsonPath('data.status', 'COMPLETED');
    }

    public function test_update_not_existing_task(): void
    {
        $route = '/api/v1/task/' . 999;
        $response = $this->putJson($route, [
            'title' => 'Updated Title',
            'description' => 'some description',
            'status'    => 'COMPLETED'
        ]);

        $response->assertStatus(404);
        $response->assertJsonStructure(['error']);
    }

    public function test_delete_task(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $route = '/api/v1/task/' . $task->id;
        $response = $this->delete($route);

        $response->assertStatus(200);
        $response->assertJsonStructure(['message']);
    }
}
