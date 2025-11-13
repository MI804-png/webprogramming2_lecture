<!DOCTYPE html>
<html>
<head>
    <title>Restaurant Hub - Application Status</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px; }
        h2 { color: #666; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; font-weight: 600; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .stat-card { background: #8b5cf6; color: white; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; }
        .links { margin: 20px 0; }
        .links a { display: inline-block; margin: 5px 10px 5px 0; padding: 10px 20px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 5px; }
        .links a:hover { background: #7c3aed; }
        .admin-info { background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f59e0b; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🍽️ Restaurant Hub - Application Status</h1>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">{{ count($users) }}</div>
                <div>Total Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{{ $restaurants }}</div>
                <div>Restaurants</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{{ $messages }}</div>
                <div>Messages</div>
            </div>
        </div>

        <div class="admin-info">
            <strong>Admin Login Credentials:</strong><br>
            Email: admin@restaurant.com<br>
            Password: password
        </div>

        <div class="links">
            <a href="{{ $routes['login'] }}">🔐 Login</a>
            <a href="{{ $routes['dashboard'] }}">📊 Dashboard</a>
            <a href="{{ $routes['admin'] }}">⚙️ Admin Panel</a>
            <a href="/restaurants">🍽️ Restaurants</a>
            <a href="/contact">📧 Contact</a>
        </div>

        <h2>👥 Users</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                <tr>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td><strong>{{ $user->role ?? 'user' }}</strong></td>
                    <td>{{ $user->created_at->format('Y-m-d H:i') }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <h2>🚀 Quick Actions</h2>
        <div class="links">
            <a href="/seed-database">🌱 Seed Database</a>
            <a href="/create-admin-user">👑 Create Admin User</a>
            <a href="/debug-admin">🔍 Debug Admin</a>
        </div>

        <h2>📝 Project Information</h2>
        <p><strong>Project:</strong> Laravel Restaurant Hub</p>
        <p><strong>Framework:</strong> Laravel 11 with React + Inertia.js</p>
        <p><strong>Database:</strong> SQLite</p>
        <p><strong>Deployment:</strong> Railway</p>
        <p><strong>Repository:</strong> <a href="https://github.com/MI804-png/webprogramming2_lecture" target="_blank">GitHub</a></p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; text-align: center;">
            <p>Web Programming 2 - Final Project</p>
            <p>Team: Mikhael Nabil Salama Rezk (IHUTSC) & Szabo Lilla (BDCRL0)</p>
        </div>
    </div>
</body>
</html>
