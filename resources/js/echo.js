// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// // Guard against SSR: only initialise Echo in the browser
// if (typeof window !== 'undefined') {
//     window.Pusher = Pusher;

//     window.Echo = new Echo({
//         broadcaster: 'reverb',
//         key: import.meta.env.VITE_REVERB_APP_KEY,
//         wsHost: import.meta.env.VITE_REVERB_HOST,
//         wsPort: import.meta.env.VITE_REVERB_PORT,
//         forceTLS: false,
//         enabledTransports: ['ws'],
//     });
// }