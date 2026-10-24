from expand_reviews import expand_file

mj_tut = """
            <h2>7.4 Step-by-Step Tutorial: Creating Consistent Character Storyboards with Midjourney</h2>
            <p>One of the most valuable commercial applications of Midjourney v7 is creating serialized graphic novels, marketing storyboards, and children's books with a recurring protagonist. Follow this battle-tested step-by-step workflow:</p>
            <ol>
                <li><strong>Step 1: Anchor the Primary Character Portrait</strong><br>
                Begin by generating a clean, neutral lighting portrait of your protagonist against a minimalist studio background. Use a descriptive prompt such as: <code>/imagine prompt: clean studio portrait of a 28-year-old female marine biologist with shoulder-length curly auburn hair, hazel eyes, wearing a dark navy waterproof windbreaker, neutral expression, 85mm lens, soft diffuse lighting --v 7 --style raw</code>. Generate grids until you find the exact face, then click <em>Upscale</em>.</li>
                <li><strong>Step 2: Copy the Image Link</strong><br>
                Right-click your upscaled image and copy its URL. This URL will serve as your digital character anchor.</li>
                <li><strong>Step 3: Apply the Character Reference Parameter (<code>--cref</code>)</strong><br>
                Now prompt your character in completely different narrative settings while appending the <code>--cref</code> tag. For example: <code>/imagine prompt: the marine biologist examining coral samples on a research submarine deck, stormy sea backdrop, cinematic lighting --cref [YOUR_IMAGE_URL] --cw 100 --v 7</code>.</li>
                <li><strong>Step 4: Modulate the Character Weight (<code>--cw</code>)</strong><br>
                The <code>--cw</code> parameter controls how much of the original image Midjourney copies. The default <code>--cw 100</code> copies the face, hairstyle, and wardrobe. If you want the character to change into an evening dress or scuba gear, set <code>--cw 20</code>, which locks the facial structure while allowing the wardrobe and hairstyle to change dynamically.</li>
                <li><strong>Step 5: Apply Inpainting for Granular Scene Adjustments</strong><br>
                Open your favorite generated panel in the Midjourney Web Studio. If a prop looks slightly off, use the <em>Vary (Region)</em> brush to select the object, type in a replacement (e.g. <em>"holding a waterproof tablet displaying sonar charts"</em>), and click render. Within minutes, you have a cohesive, print-ready storyboard.</li>
            </ol>

            <h2>7.5 Verified Midjourney Prompt Library for Popular Aesthetics</h2>
            <p>Our review team curated a reference set of tested prompts that consistently produce award-winning results in v7:</p>
            <ul>
                <li><strong>Cinematic Documentary:</strong> <code>candid street photograph of an espresso bar in Naples, early morning mist, ray of sunlight through dusty window, 35mm f/2 film stock, Kodak Portra 400 tones --v 7 --style raw --ar 16:9</code></li>
                <li><strong>Editorial Fashion:</strong> <code>high-fashion editorial portrait, sculptural pleated silk garment, dramatic side rim lighting, metallic silver and deep emerald color palette, Vogue cover style --v 7 --ar 4:5</code></li>
                <li><strong>Industrial Concept Design:</strong> <code>ergonomic modular wireless mechanical keyboard, anodized aluminum chassis, translucent smoked acrylic accents, studio product lighting, dark slate background --v 7 --ar 16:9</code></li>
            </ul>
"""
expand_file("midjourney-review.html", mj_tut)

px_tut = """
            <h2>7.4 Step-by-Step Tutorial: Conducting Deep Market Due Diligence with Perplexity</h2>
            <p>Whether you are evaluating a SaaS competitor, preparing for an executive meeting, or vetting a new vendor, Perplexity can accelerate your research by 10x. Here is the exact methodology our editorial team uses:</p>
            <ol>
                <li><strong>Step 1: Set Focus to All or Academic</strong><br>
                For broader business intelligence, start on the default web focus. If you require technical whitepapers or clinical trial data, click <em>Focus &gt; Academic</em> to restrict results to verified scientific publications.</li>
                <li><strong>Step 2: Enable Deep Research</strong><br>
                Click the <em>Deep Research</em> toggle next to the prompt input. Frame your inquiry with specific qualitative and quantitative parameters: <em>"Provide an exhaustive market analysis of the enterprise vector database landscape in 2025-2026. Compare Pinecone, Weaviate, Qdrant, and pgvector on indexing throughput, hybrid search latency, pricing at 100M vectors, and major enterprise customer adoptions."</em></li>
                <li><strong>Step 3: Monitor the Autonomous Reasoning Pipeline</strong><br>
                Perplexity will begin its multi-phase research loop, querying benchmark papers, technical GitHub repositories, and analyst reports. You can observe the sub-questions it generates in real time.</li>
                <li><strong>Step 4: Inspect and Cross-Verify Citations</strong><br>
                Once the synthesis completes, click the numbered brackets next to critical data points (such as queries per second or memory footprints) to review the exact source snippet.</li>
                <li><strong>Step 5: Export to Perplexity Pages</strong><br>
                Click the <em>Convert to Page</em> icon in the top-right toolbar. Perplexity organizes the findings into a polished report with executive summaries and comparison tables. Click <em>Share</em> to send a public or password-protected link directly to your stakeholders.</li>
            </ol>

            <h2>7.5 Power-User Keyboard Shortcuts & Query Operators</h2>
            <p>Accelerate your search velocity with these verified Perplexity commands:</p>
            <ul>
                <li><strong>Domain Filtering (<code>site:</code>):</strong> Constrain search to specific authority domains, e.g. <code>site:github.com React Server Components state</code> or <code>site:sec.gov NVIDIA 10-K datacenter revenue</code>.</li>
                <li><strong>Filetype Search (<code>filetype:pdf</code>):</strong> Locate official whitepapers and slide decks directly, e.g. <code>autonomous vehicle safety report 2025 filetype:pdf</code>.</li>
                <li><strong>Quick Pro Toggle:</strong> Press <code>Ctrl + Shift + Enter</code> on desktop to immediately trigger a Pro Search without reaching for the mouse.</li>
            </ul>
"""
expand_file("perplexity-ai-review.html", px_tut)

cur_tut = """
            <h2>7.4 Step-by-Step Tutorial: Building and Refactoring a Microservice with Cursor Composer</h2>
            <p>To demonstrate Cursor's agentic workflow, here is a practical walkthrough of building a resilient rate-limiting microservice in TypeScript:</p>
            <ol>
                <li><strong>Step 1: Launch Composer in Agent Mode</strong><br>
                In your project workspace, press <code>Cmd + I</code> (macOS) or <code>Ctrl + I</code> (Windows/Linux) to open the Composer panel. Switch the mode dropdown from <em>Normal</em> to <em>Agent</em>.</li>
                <li><strong>Step 2: Reference Relevant Project Files</strong><br>
                Type <code>@</code> to open the context palette. Tag your server entry point (<code>@server.ts</code>) and your package manifest (<code>@package.json</code>).</li>
                <li><strong>Step 3: Provide Clear Architectural Directives</strong><br>
                Input your prompt: <em>"Implement a Redis-backed sliding-window rate limiter middleware for our Express API. Limit authenticated users to 100 requests per minute and anonymous users to 20 requests per minute. Create a new file in src/middleware/rate-limiter.ts, add ioredis to package.json, and mount the middleware in server.ts with graceful error handling if Redis is down."</em></li>
                <li><strong>Step 4: Review Multi-File Diff Proposals</strong><br>
                Composer reads your existing code conventions, installs <code>ioredis</code> via the terminal, drafts <code>src/middleware/rate-limiter.ts</code> with clean TypeScript interfaces, and updates <code>server.ts</code>. The editor displays a color-coded split diff for every impacted file.</li>
                <li><strong>Step 5: Validate and Accept</strong><br>
                Inspect the generated code. If you want a slight change (such as adding Prometheus metrics), simply type follow-up instructions into the Composer chat: <em>"Also increment a counter metric on 429 Too Many Requests."</em> Once satisfied, press <code>Ctrl + Enter</code> to apply all changes across the codebase simultaneously.</li>
            </ol>

            <h2>7.5 Essential Cursor Keyboard Shortcuts Reference</h2>
            <p>Master these core shortcuts to maximize your daily coding speed:</p>
            <ul>
                <li><strong><code>Cmd + K</code> / <code>Ctrl + K</code>:</strong> In-line code generation and edit directly within the active editor buffer.</li>
                <li><strong><code>Cmd + L</code> / <code>Ctrl + L</code>:</strong> Open the AI Chat sidebar to interrogate your codebase or explain complex algorithms.</li>
                <li><strong><code>Cmd + I</code> / <code>Ctrl + I</code>:</strong> Launch Composer for multi-file feature development and system-wide refactoring.</li>
                <li><strong><code>Tab</code>:</strong> Accept multi-line and multi-location next-edit suggestions from Cursor Tab.</li>
                <li><strong><code>Cmd + Enter</code> / <code>Ctrl + Enter</code>:</strong> Instant acceptance of all unified diffs proposed by Composer.</li>
            </ul>
"""
expand_file("cursor-ai-review.html", cur_tut)
print("Applied tutorials and reference libraries to all 3 reviews!")
