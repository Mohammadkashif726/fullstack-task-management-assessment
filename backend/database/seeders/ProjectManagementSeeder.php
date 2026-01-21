<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Carbon;

class ProjectManagementSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create some realistic users (assignees)
        $users = User::factory()->count(5)->create([
            'name' => fn() => fake()->name(),
            'email' => fn() => fake()->unique()->safeEmail(),
            'password' => bcrypt('password'),
        ]);

        // 2. Create 4 clients with realistic names
        $clients = [
            ['name' => 'TechNova Solutions'],
            ['name' => 'Global Retail Group'],
            ['name' => 'HealthCare Plus'],
            ['name' => 'EduSmart Academy'],
        ];

        foreach ($clients as $clientData) {
            $client = Client::create($clientData);

            // 3. Each client gets 2–5 projects
            $projectCount = rand(2, 5);

            for ($i = 1; $i <= $projectCount; $i++) {
                $project = Project::create([
                    'name'       => $this->generateProjectName($i, $client->name),
                    'client_id'  => $client->id,
                ]);

                // 4. Each project gets 6–15 tasks with different statuses & dates
                $taskCount = rand(6, 15);

                for ($j = 1; $j <= $taskCount; $j++) {
                    $status = $this->getRandomStatus($j);
                    $dueDate = $this->getRealisticDueDate($status);

                    Task::create([
                        'title'      => $this->generateTaskTitle($j, $status),
                        'status'     => $status,
                        'due_date'   => $dueDate,
                        'project_id' => $project->id,
                        'user_id'    => $users->random()->id, // random assignee
                    ]);
                }
            }
        }

        $this->command->info('Project Management Seeder completed successfully!');
        $this->command->info('Created:');
        $this->command->info('- ' . User::count() . ' users');
        $this->command->info('- ' . Client::count() . ' clients');
        $this->command->info('- ' . Project::count() . ' projects');
        $this->command->info('- ' . Task::count() . ' tasks');
    }

    private function generateProjectName(int $index, string $clientName): string
    {
        $prefixes = ['Website Redesign', 'Mobile App Development', 'CRM Implementation', 'E-commerce Platform', 'Digital Marketing Campaign', 'Internal Dashboard', 'API Integration', 'Brand Refresh'];
        return $prefixes[array_rand($prefixes)] . ' ' . $index;
    }

    private function generateTaskTitle(int $index, string $status): string
    {
        $actions = [
            'todo'  => ['Create', 'Design', 'Research', 'Plan', 'Setup', 'Gather requirements for'],
            'doing' => ['Implementing', 'Developing', 'Testing', 'Reviewing', 'Optimizing', 'Refactoring'],
            'done'  => ['Completed', 'Deployed', 'Approved', 'Integrated', 'Launched', 'Finalized']
        ];

        $topics = ['homepage', 'login system', 'user dashboard', 'payment gateway', 'admin panel', 'product catalog', 'search functionality', 'responsive design', 'SEO optimization', 'email notifications'];

        return $actions[$status][array_rand($actions[$status])] . ' ' . $topics[array_rand($topics)];
    }

    private function getRandomStatus(int $taskIndex): string
    {
        // More realistic distribution: more todo, less done
        $rand = rand(1, 100);
        if ($rand <= 45) return 'todo';
        if ($rand <= 80) return 'doing';
        return 'done';
    }

    private function getRealisticDueDate(string $status): ?Carbon
    {
        $now = Carbon::now();

        return match ($status) {
            'todo'  => $now->copy()->addDays(rand(5, 45)),
            'doing' => $now->copy()->subDays(rand(1, 10))->addDays(rand(1, 20)),
            'done'  => $now->copy()->subDays(rand(3, 60)),
            default => null,
        };
    }
}