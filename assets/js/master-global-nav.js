/* =============================================================================
   TINITIATE MASTERCLASS ACADEMY - UNIFIED GLOBAL INTERACTIVITY
   Subjects Dropdown, In-Page Scrollspy, and Theme Synchronization
   ============================================================================= */

(function() {
  let dropdownTimeout = null;
  // Resolve site-root links from this script's own URL so they work at any folder depth
  const NAV_SCRIPT_SRC = document.currentScript && document.currentScript.src;

  // "Why TinitiateAI" call-to-action, added to every page's header after the Subjects menu
  function injectWhyButton() {
    const links = document.querySelector('.master-menu-links');
    if (!links || links.querySelector('.why-tinitiate-btn') || !NAV_SCRIPT_SRC) return;
    const href = new URL('../../why-tinitiate.html', NAV_SCRIPT_SRC).href;
    const a = document.createElement('a');
    a.className = 'master-nav-btn why-tinitiate-btn';
    a.href = href;
    a.title = 'Why learn with TinitiateAI';
    a.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M12 2l2.4 6.9L21 9.3l-5.2 4.4L17.5 21 12 17.3 6.5 21l1.7-7.3L3 9.3l6.6-.4z"/></svg><span>Why TinitiateAI</span>';
    if (location.href.split('#')[0] === href) a.classList.add('is-current');
    links.appendChild(a);
  }

  function adjustMegaMenuPosition() {
    const menu = document.querySelector('#subjectsDropdown .master-dropdown-menu');
    if (!menu) return;
    // Nudge with margin-left so the CSS centering transform stays intact
    menu.style.marginLeft = '';
    // 8px gutter: matches the 10px inset the CSS already uses on phones, so nothing shifts there
    const gutter = 8;
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth - gutter) {
      menu.style.marginLeft = `-${rect.right - (window.innerWidth - gutter)}px`;
    } else if (rect.left < gutter) {
      menu.style.marginLeft = `${gutter - rect.left}px`;
    }
  }

  // 1. Dropdown Toggle Function
  window.toggleSubjectsDropdown = function(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const dd = document.getElementById('subjectsDropdown');
    if (dd) {
      clearTimeout(dropdownTimeout);
      const willOpen = !dd.classList.contains('open');
      dd.classList.toggle('open');
      if (willOpen) {
        requestAnimationFrame(adjustMegaMenuPosition);
      }
    }
  };

  // Setup hover and click listeners once DOM is ready
  function initSubjectsDropdown() {
    const dd = document.getElementById('subjectsDropdown');
    if (!dd) return;

    dd.addEventListener('mouseenter', () => {
      clearTimeout(dropdownTimeout);
      dd.classList.add('open');
      requestAnimationFrame(adjustMegaMenuPosition);
    });

    dd.addEventListener('mouseleave', () => {
      dropdownTimeout = setTimeout(() => {
        dd.classList.remove('open');
      }, 350); // 350ms buffer so mouse never accidentally collapses menu
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    const dd = document.getElementById('subjectsDropdown');
    if (dd && !dd.contains(e.target)) {
      dd.classList.remove('open');
    }
  });

  // 2. In-Page Scrollspy for Right Sidebar Navigation
  document.addEventListener('DOMContentLoaded', function() {
    initSubjectsDropdown();
    injectWhyButton();
    const inpageLinks = document.querySelectorAll('.sidebar-inpage-nav .inpage-link');
    if (inpageLinks.length === 0) return;

    const sections = [];
    inpageLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.getElementById(href.substring(1));
        if (target) {
          sections.push({ id: href.substring(1), elem: target, link: link });
        }
      }
    });

    if (sections.length === 0) return;

    function onScrollSpy() {
      const scrollPos = window.scrollY + 120;
      let activeIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const top = sections[i].elem.getBoundingClientRect().top + window.scrollY;
        if (scrollPos >= top - 20) {
          activeIndex = i;
        }
      }

      sections.forEach((sec, idx) => {
        if (idx === activeIndex) {
          sec.link.classList.add('active');
        } else {
          sec.link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();

    // Re-init lucide icons if available
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });
})();
