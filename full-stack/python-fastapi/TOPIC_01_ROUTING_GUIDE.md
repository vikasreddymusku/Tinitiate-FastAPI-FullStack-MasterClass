# Topic 01 — FastAPI Routing: Every Request Needs the Right Door

Open [routing.html](routing.html) using a local HTTP server, from the academy root.

### Study flow

1. **Understand:** A library with three different doors; a route is an HTTP method plus a path connected to a Python function.
2. **Inspect code:** Click five code lines to learn how a minimal FastAPI app works.
3. **Experiment:** Change a method, path, registration order, router prefix, integer path input, query value, request JSON, or route list. Use Run, Next step, Reset, and the story presets. The rendered code updates immediately.
4. **Build a route:** Add `GET /hello` (or a route with a typed `{name}` segment), disable it, move it, delete it, and observe the results.
5. **Check understanding:** Three mission badges track successes; no personal data is collected by the lesson.

### Key distinctions explicitly taught

- **404 from routing:** No matching method/path registration exists.
- **404 from handler:** The route matched, but the function cannot find the book ID in the example data.
- **405:** The path exists but the requested HTTP method isn't registered for it.
- **422:** An expected integer, query value, or request body doesn't meet validation requirements.
- **307:** For a matching alternative with/without the final slash, default FastAPI routing normally redirects while preserving the HTTP method.
- **Ordering:** An earlier dynamic route such as `/books/{book_id}` can capture `/books/latest` and then fail its integer validation. Move `/books/latest` above the dynamic route to fix it.
- **Router prefix:** Turning on `/api/v1` moves book routes into the namespaced address.

### Implementation notes

The browser demonstrates *editing Python source*, not dynamically editing a running FastAPI service. A route-added animation is a simulation. Some surrounding course pages are broad reference material, not yet rewritten into this beginner-first lesson style. The lesson deliberately teaches routing before the detailed JWT/OAuth chapter, which will be a separate topic.

Official references: [FastAPI path parameters and order](https://fastapi.tiangolo.com/tutorial/path-params/) and [multiple files and APIRouter](https://fastapi.tiangolo.com/tutorial/bigger-applications/).
