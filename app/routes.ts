import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  layout('components/layout/LandingLayout.tsx', [index('routes/landing.tsx')]),
  route('auth/callback', 'routes/auth.callback.tsx'),
  ...prefix('app', [
    layout('components/layout/AppLayout.tsx', [
      index('routes/feed.tsx'),
      route('create', 'routes/create-pin.tsx'),
      route('pin/:pinId', 'routes/pin.tsx'),
      ...prefix('settings', [
        layout('components/layout/SettingsLayout.tsx', [
          index('routes/settings/edit-profile.tsx'),
          route('profile-visibility', 'routes/settings/profile-visibility.tsx'),
          route('refine', 'routes/settings/refine.tsx'),
        ]),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
