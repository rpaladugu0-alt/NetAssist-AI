export function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12.5c4.1-4.2 9.9-4.2 14 0M8 15.4c2.3-2.2 5.7-2.2 8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="18.2" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function RestartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 7.5A6 6 0 1 1 6 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M7 4.5v4h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4.5 3.8 19h16.4L12 4.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 10v4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.7" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function BillIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function RouterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="13" width="17" height="6" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 13V8.5M12 13V7M16 13V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="16" r="0.8" fill="currentColor" />
      <circle cx="11.5" cy="16" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12 20 5l-6.2 14-2.3-5.2L4 12Z" fill="currentColor" />
    </svg>
  );
}

export function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 5.5h11.5A2.5 2.5 0 0 1 19 8v11H7.5A2.5 2.5 0 0 0 5 21.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function HeadsetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 13V11a7 7 0 0 1 14 0v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect x="3.5" y="12" width="4" height="6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="16.5" y="12" width="4" height="6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ThumbUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 11v9H5.5A1.5 1.5 0 0 1 4 18.5v-6A1.5 1.5 0 0 1 5.5 11H8Zm0 0 3-7a2 2 0 0 1 2 2v4h5.2a2 2 0 0 1 2 2.3l-1 6A2 2 0 0 1 17.2 20H8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThumbDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16 13V4h2.5A1.5 1.5 0 0 1 20 5.5v6A1.5 1.5 0 0 1 18.5 13H16Zm0 0-3 7a2 2 0 0 1-2-2v-4H5.8a2 2 0 0 1-2-2.3l1-6A2 2 0 0 1 6.8 4H16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const starterIcons = {
  wifi: WifiIcon,
  restart: RestartIcon,
  alert: AlertIcon,
  bill: BillIcon,
  router: RouterIcon,
};
