
        // =====================================================================
        // DOM-BASED 3D SPHERICAL WORD CLOUD ENGINE
        // =====================================================================
        (function() {
          let sphereWrapper, stage;
          let tagElements = [];
          let tagPoints = [];
          let radius = 155;
          let currentFilter = 'all';
          let isRotating = true;
          let isDragging = false;
          let lastMouseX = 0, lastMouseY = 0;
          let velX = 0.003, velY = 0.004;
          let animId = null;
          let activeTargetId = 'term-llm';

          function initSpherePoints() {
            tagElements = Array.from(document.querySelectorAll('#wordCloudStage .cloud-3d-tag'));
            const count = tagElements.length;
            if (count === 0) return;

            const rect = sphereWrapper ? sphereWrapper.getBoundingClientRect() : { width: 800, height: 420 };
            const minDim = Math.min(rect.width || 800, rect.height || 420);
            radius = Math.max(120, minDim * 0.38);

            tagPoints = tagElements.map(function(el, i) {
              const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
              const theta = Math.PI * (1 + Math.sqrt(5)) * i;

              return {
                el: el,
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.cos(phi),
                z: radius * Math.sin(phi) * Math.sin(theta)
              };
            });
          }

          function rotateX(angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            for (let i = 0; i < tagPoints.length; i++) {
              const p = tagPoints[i];
              const y1 = p.y * cos - p.z * sin;
              const z1 = p.z * cos + p.y * sin;
              p.y = y1;
              p.z = z1;
            }
          }

          function rotateY(angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            for (let i = 0; i < tagPoints.length; i++) {
              const p = tagPoints[i];
              const x1 = p.x * cos - p.z * sin;
              const z1 = p.x * cos + p.y * sin;
              p.x = x1;
              p.z = z1;
            }
          }

          function updateSphereFrame() {
            if (isRotating && !isDragging) {
              rotateY(velY);
              rotateX(velX);
            }

            const perspective = 350;

            for (let i = 0; i < tagPoints.length; i++) {
              const p = tagPoints[i];
              const scale = perspective / (perspective - p.z);
              const screenX = Math.round(p.x * scale);
              const screenY = Math.round(p.y * scale);
              const normZ = (p.z + radius) / (2 * radius);
              const alpha = Math.max(0.22, Math.min(1.0, 0.35 + 0.65 * normZ));
              const zIndex = Math.round(p.z + 500);

              p.el.style.transform = 'translate3d(' + screenX + 'px, ' + screenY + 'px, 0) translate(-50%, -50%) scale(' + scale.toFixed(3) + ')';
              p.el.style.opacity = alpha.toFixed(3);
              p.el.style.zIndex = zIndex;
            }

            animId = requestAnimationFrame(updateSphereFrame);
          }

          function inspectTagElement(el) {
            if (!el) return;
            const badge = document.getElementById('inspCategoryBadge');
            const name = document.getElementById('inspTermName');
            const meta = document.getElementById('inspMetaphor');

            const text = el.textContent || '';
            const bText = el.getAttribute('data-badge') || 'Core Concept';
            const mText = el.getAttribute('data-meta') || '';
            activeTargetId = el.getAttribute('data-id') || 'term-llm';

            if (badge) badge.textContent = bText;
            if (name) name.textContent = text;
            if (meta) meta.innerHTML = '<strong>Mental Model:</strong> ' + mText;

            tagElements.forEach(function(t) {
              if (t === el) t.classList.add('active');
              else t.classList.remove('active');
            });
          }

          window.filterSphereCategory = function(cat, btn) {
            currentFilter = cat;
            document.querySelectorAll('.cloud-filter-btn').forEach(function(b) { b.classList.remove('active'); });
            if (btn) btn.classList.add('active');

            tagElements.forEach(function(el) {
              const tagCat = el.getAttribute('data-cat');
              if (cat === 'all' || tagCat === cat) {
                el.classList.remove('dimmed');
              } else {
                el.classList.add('dimmed');
              }
            });
          };

          window.toggleSphereRotation = function() {
            isRotating = !isRotating;
            const label = document.getElementById('label-sphere-motion');
            const icon = document.getElementById('icon-sphere-motion');
            if (label) label.textContent = isRotating ? 'Pause Spin' : 'Resume Spin';
            if (icon) {
              icon.setAttribute('data-lucide', isRotating ? 'pause' : 'play');
              if (window.lucide) lucide.createIcons();
            }
          };

          window.resetSphereView = function() {
            initSpherePoints();
            velX = 0.003;
            velY = 0.004;
          };

          window.jumpToActiveSphereTerm = function() {
            if (!activeTargetId) return;
            const targetEl = document.getElementById(activeTargetId);
            if (targetEl) {
              if (targetEl.tagName.toLowerCase() === 'details') {
                targetEl.open = true;
              }
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              targetEl.style.boxShadow = '0 0 35px rgba(139, 92, 246, 0.75)';
              targetEl.style.transition = 'box-shadow 0.3s ease';
              setTimeout(function() {
                targetEl.style.boxShadow = '';
              }, 2200);
            }
          };

          function setupSphereInteractivity() {
            if (!sphereWrapper) return;

            sphereWrapper.addEventListener('mousedown', function(e) {
              isDragging = true;
              lastMouseX = e.clientX;
              lastMouseY = e.clientY;
            });

            window.addEventListener('mouseup', function() {
              isDragging = false;
            });

            sphereWrapper.addEventListener('mousemove', function(e) {
              if (isDragging) {
                const dx = e.clientX - lastMouseX;
                const dy = e.clientY - lastMouseY;
                rotateY(dx * 0.005);
                rotateX(-dy * 0.005);
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
              }
            });

            tagElements.forEach(function(el) {
              el.addEventListener('mouseenter', function() {
                inspectTagElement(el);
              });

              el.addEventListener('click', function(e) {
                e.stopPropagation();
                inspectTagElement(el);
                window.jumpToActiveSphereTerm();
              });
            });
          }

          function startSphere() {
            sphereWrapper = document.getElementById('sphereWrapper');
            stage = document.getElementById('wordCloudStage');
            if (!sphereWrapper || !stage) return;

            initSpherePoints();
            setupSphereInteractivity();

            if (tagElements.length > 0) {
              inspectTagElement(tagElements[0]);
            }

            if (animId) cancelAnimationFrame(animId);
            animId = requestAnimationFrame(updateSphereFrame);

            window.addEventListener('resize', function() {
              initSpherePoints();
            }, { passive: true });
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startSphere);
          } else {
            startSphere();
          }
        })();
        