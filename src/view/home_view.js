import {Button} from 'react-bootstrap';
import React, { useCallback } from "react";
function TypesExample() {

  const openApp = useCallback(() => {
    // Accountify (your original)
    const androidStore = "https://play.google.com/store/apps/details?id=com.isca.accountify";
    const iosStore = "https://apps.apple.com/in/app/iscaccountify/id6744101857";
    const appLink = "https://iscaccountify.sg/iscaccountify";
    const intentUrl =
      "intent://iscaccountify.sg/iscaccountify#Intent;" +
      "scheme=https;" +
      "package=com.isca.accountify;" +
      "S.browser_fallback_url=" + encodeURIComponent(androidStore) + ";" +
      "end";

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Use visibilitychange to detect if app opened
    let appOpened = false;
    function onVis() {
      if (document.hidden) appOpened = true;
    }
    document.addEventListener("visibilitychange", onVis);

    const now = Date.now();

    if (isAndroid) {
      // Use same-tab navigation for intent (more reliable than new tab)
      window.location.href = intentUrl;

      // fallback after delay only if app didn't open
      setTimeout(() => {
        if (!appOpened && Date.now() - now < 3000) {
          window.location.href = androidStore;
        }
        document.removeEventListener("visibilitychange", onVis);
      }, 1500);
    } else if (isIOS) {
      // Try universal link
      window.location.href = appLink;

      setTimeout(() => {
        if (!appOpened) {
          window.location.href = iosStore;
        }
        document.removeEventListener("visibilitychange", onVis);
      }, 1500);
    } else {
      // Desktop -> open web page in new tab
      window.open(appLink, "_blank");
      document.removeEventListener("visibilitychange", onVis);
    }
  }, []);

  const openBoardflixApp = useCallback(() => {
    const androidStore = "https://play.google.com/store/apps/details?id=com.board.flix";
    const iosStore = "https://apps.apple.com/in/app/boardflix/id6740686468";
    const appLink = "https://boardflix.sg/boardflix";
    const intentUrl =
      "intent://boardflix.sg/boardflix#Intent;" +
      "scheme=https;" +
      "package=com.board.flix;" +
      "S.browser_fallback_url=" + encodeURIComponent(androidStore) + ";" +
      "end";

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    let appOpened = false;
    function onVis() {
      if (document.hidden) appOpened = true;
    }
    document.addEventListener("visibilitychange", onVis);

    const now = Date.now();

    if (isAndroid) {
      window.location.href = intentUrl;
      setTimeout(() => {
        if (!appOpened && Date.now() - now < 3000) {
          window.location.href = androidStore;
        }
        document.removeEventListener("visibilitychange", onVis);
      }, 1500);
    } else if (isIOS) {
      window.location.href = appLink;
      setTimeout(() => {
        if (!appOpened) {
          window.location.href = iosStore;
        }
        document.removeEventListener("visibilitychange", onVis);
      }, 1500);
    } else {
      window.open("https://boardflix.sg", "_blank");
      document.removeEventListener("visibilitychange", onVis);
    }
  }, []);

  const openBoardflix = useCallback(() => {
    // Another variant that uses visibility detection + universal link fallback
    const iosStore = "https://apps.apple.com/in/app/boardflix/id6740686468";
    const playStore = "https://play.google.com/store/apps/details?id=com.board.flix";
    const universalLink = "https://boardflix.sg/boardflix";
    const ua = navigator.userAgent || "";
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const fallbackUrl = isIOS ? iosStore : (isAndroid ? playStore : universalLink);

    let appOpened = false;
    function onVis() {
      if (document.hidden) appOpened = true;
    }
    document.addEventListener("visibilitychange", onVis);

    window.location.href = universalLink;

    setTimeout(() => {
      if (!appOpened) {
        window.location.href = fallbackUrl;
      }
      document.removeEventListener("visibilitychange", onVis);
    }, 1200);
  }, []);
  
  return (
    <>
      <Button variant="primary" onClick={openApp}>Primary</Button>
      <Button variant="secondary"  onClick={openBoardflixApp}>Secondary</Button>
      <Button variant="success" onClick={openBoardflix}>Success</Button>
      {/* <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="info">Info</Button>
      <Button variant="light">Light</Button>
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button> */}
    </>
  );

  
}

export default TypesExample;