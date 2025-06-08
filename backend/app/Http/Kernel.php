<?php

namespace App\Http;

use Illuminate\Contracts\Http\Kernel as HttpKernelContract;
use Illuminate\Foundation\Http\Kernel as BaseHttpKernel;
use Illuminate\Http\Request;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\CheckForMaintenanceMode;
use App\Http\Middleware\EncryptCookies;
use App\Http\Middleware\VerifyCsrfToken;
use App\Http\Middleware\SubstituteBindings;

class Kernel extends BaseHttpKernel implements HttpKernelContract
{
    /**
     * Los proveedores de servicios de aplicación globales.
     *
     * Estos proveedores de servicios siempre están disponibles para la aplicación.
     *
     * @var array
     */
    protected $middleware = [
            // Este middleware asegura que las solicitudes estén bien formateadas.
        CheckForMaintenanceMode::class,
            // Para garantizar la protección CSRF.
        VerifyCsrfToken::class,
            // Este middleware cifra las cookies para mejorar la seguridad.
        EncryptCookies::class,
            // Este middleware maneja la autenticación de los usuarios.
        Authenticate::class,
            // Middleware de sustitución de parámetros en las rutas
        SubstituteBindings::class,
    ];

    /**
     * Los proveedores de servicios de aplicación que se cargan en el grupo "web".
     *
     * Estos proveedores de servicios se utilizan cuando la solicitud se procesa a través de la web.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            EncryptCookies::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\AuthenticateSession::class,
            VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            // Configuración específica para API, como autenticación por tokens
            'throttle:api',  // Asegura que las solicitudes no excedan los límites establecidos
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    /**
     * Los middleware que están disponibles para ser asignados a rutas.
     *
     * Estos son middleware adicionales que puedes aplicar solo a ciertas rutas.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'role' => \App\Http\Middleware\CheckRole::class,
    ];

    /**
     * Los middleware globales del framework.
     *
     * Estos middleware se ejecutan en todas las solicitudes, independientemente de la ruta.
     *
     * @var array
     */
    protected $middlewarePriority = [
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        Authenticate::class,
        \App\Http\Middleware\RedirectIfAuthenticated::class,
        VerifyCsrfToken::class,
        CheckForMaintenanceMode::class,
    ];

    /**
     * Registra los comandos de consola para la aplicación.
     *
     * @param  \Illuminate\Console\Application  $console
     * @return void
     */
    public function bootstrap()
    {
        parent::bootstrap();

        // Registra aquí los comandos de consola que desees cargar
        // \Artisan::starting(function ($artisan) {
        //     $artisan->resolveCommands([
        //         \App\Console\Commands\YourCommand::class,
        //     ]);
        // });
    }

    /**
     * Define los servicios para ser ejecutados cuando se inicia la aplicación.
     *
     * @param \Illuminate\Foundation\Application $app
     * @return void
     */
    public function handle($request)
    {
        // Puedes realizar tareas de inicialización antes de manejar la solicitud
        parent::handle($request); // No devolvemos nada explícitamente
    }

    /**
     * Realiza tareas de limpieza después de la ejecución de la solicitud.
     *
     * @return void
     */
    public function terminate($request, $response)
    {
        // Por ejemplo, puedes agregar algo para registrar los logs después de la respuesta.
        parent::terminate($request, $response);
    }
}
