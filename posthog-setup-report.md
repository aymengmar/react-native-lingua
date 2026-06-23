<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Muolingo Expo app. A new `lib/posthog.ts` singleton was created using `expo-constants` to read credentials from `app.config.js` extras (which are populated from `.env` at build time). `PostHogProvider` was added to `app/_layout.tsx`, wrapping the entire app, with manual screen tracking via `usePathname`. User identification via `posthog.identify()` is called on both sign-up completion and sign-in completion using the user's email as the distinct ID. Error capture via `posthog.captureException()` was added to auth failure paths. `posthog-react-native` and `react-native-svg` were installed, and `app.json` was migrated to `app.config.js` to support environment variable injection.

| Event name | Description | File |
|---|---|---|
| `onboarding_get_started_tapped` | User taps the Get Started button on the onboarding screen, entering the sign-up flow. | `app/onboarding.tsx` |
| `sign_up_submitted` | User submits the sign-up form with email and password. | `app/(auth)/sign-up.tsx` |
| `sign_up_completed` | User successfully completes sign-up after email verification. | `app/(auth)/sign-up.tsx` |
| `sign_in_submitted` | User submits the sign-in form with their email address. | `app/(auth)/sign-in.tsx` |
| `sign_in_completed` | User successfully completes sign-in after email verification. | `app/(auth)/sign-in.tsx` |
| `email_verification_failed` | User entered an incorrect or expired verification code. | `components/VerificationModal.tsx` |
| `email_verification_code_resent` | User requested a new verification code be sent to their email. | `components/VerificationModal.tsx` |
| `language_selected` | User confirms their chosen language on the language selection screen. | `app/language-selection.tsx` |
| `continue_learning_tapped` | User taps the Continue button on the home screen's Continue Learning card. | `app/(tabs)/index.tsx` |
| `todays_plan_item_tapped` | User taps a task item in the Today's Plan section on the home screen. | `app/(tabs)/index.tsx` |
| `ai_video_call_started` | User taps the video call button in the Next Up card on the home screen. | `app/(tabs)/index.tsx` |
| `language_change_initiated` | User taps Change Language on the profile screen to navigate to language selection. | `app/(tabs)/profile.tsx` |
| `user_signed_out` | User signs out of the app from the profile screen. | `app/(tabs)/profile.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://eu.posthog.com/project/207914/dashboard/767545)
- [Sign-up conversion funnel (wizard)](https://eu.posthog.com/project/207914/insights/oDbun6qB)
- [Sign-in funnel (wizard)](https://eu.posthog.com/project/207914/insights/TyZ0Qals)
- [Language selections over time (wizard)](https://eu.posthog.com/project/207914/insights/mq9jic3t)
- [Learning engagement events (wizard)](https://eu.posthog.com/project/207914/insights/Qs4ztuQW)
- [User sign-outs — churn signal (wizard)](https://eu.posthog.com/project/207914/insights/YnIAR9fH)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Confirm the returning-visitor path also calls `identify` — currently `identify` is only called on fresh sign-in/sign-up completion; returning sessions restored from Clerk's token cache will be on anonymous distinct IDs until the user signs in again.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-expo/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
