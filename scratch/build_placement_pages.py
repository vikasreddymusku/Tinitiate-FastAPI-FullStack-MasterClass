"""
Build the Placement Assistance vertical: placement-assistance/index.html + one page per topic.

  python scratch/build_placement_pages.py

Content lives in TOPICS below (plain data). The shared header is copied from the root
index.html (so it always matches the site menu) and re-pointed one folder deeper.
Block types: p, list, cards, steps, dodont, compare, tip, script, paper, timeline, myths, qa, table
"""
import html
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "placement-assistance"
E = html.escape

PHASES = [
    ("Get Ready", "Build the profile that gets you noticed", "rocket_launch"),
    ("Get Shortlisted", "Apply smart and clear the tests", "how_to_reg"),
    ("Crack the Interview", "Walk in prepared, walk out confident", "record_voice_over"),
    ("Win the Offer", "Close strong and stand out", "workspace_premium"),
]

# fmt: off
TOPICS = [
  # ------------------------------------------------------------------ GET READY
  dict(slug="resume-prep", phase=0, title="Resume Prep", icon="description",
    short="A 1-page resume that gets shortlisted",
    kicker="Resume Prep",
    h1="A resume that gets you shortlisted, even from a tier-2 college",
    sub="Recruiters spend only a few seconds on the first look. Your resume's job is simple: make those seconds count and get you the interview call.",
    chips=[("description", "1 page for freshers"), ("smart_toy", "ATS-friendly"), ("code", "Projects > percentages")],
    sections=[
      ("What recruiters actually look for", "visibility", [
        ("cards", [("bolt", "Skills that match the job", "The exact tools and languages in the job description: Python, SQL, Java, cloud, and so on."),
                   ("construction", "Projects with results", "Real things you built, with numbers. This is where tier-2 students win."),
                   ("work", "Internships & experience", "Even a 2-month internship or freelance project counts. Show what you did."),
                   ("format_align_left", "Clean, simple format", "Easy to scan in seconds. No clutter, no fancy graphics.")]),
      ]),
      ("The perfect fresher resume structure", "view_agenda", [
        ("p", "Follow this order. Notice that Projects and Skills come before Education: lead with what you can do, not where you studied."),
        ("paper", [("Name · Phone · Email · LinkedIn · GitHub", "One line at the top. Use a professional email like firstname.lastname@gmail.com."),
                   ("Summary (2 lines)", "\"Final-year B.Tech (CSE) student skilled in Python, SQL and Power BI. Built 3 data projects, including a sales dashboard used by a local business.\""),
                   ("Skills", "Group them: Languages, Tools, Cloud, Databases. Only list what you can answer questions on."),
                   ("Projects (2–3)", "Title, tech stack, 2–3 bullet points with results, and a GitHub link."),
                   ("Internships / Experience", "Company, role, dates, and what you achieved."),
                   ("Education", "Degree, college, year, CGPA (if it meets the company cutoff)."),
                   ("Certifications & Achievements", "Hackathons, coding ranks, certifications, college roles.")]),
      ]),
      ("Write project points that impress", "edit_note", [
        ("compare", ("Made a website using HTML, CSS and JavaScript.",
                     "Built a student attendance web app (React, Node.js, MongoDB) used by 60+ classmates, cutting manual roll-call time by 10 minutes per class.")),
        ("tip", ("lightbulb", "Use this formula for every bullet: <b>Action verb + what you built + tech used + result (with a number)</b>. Numbers make you believable: users, time saved, accuracy, records processed.", "")),
      ]),
      ("Beat the ATS (Applicant Tracking System)", "smart_toy", [
        ("p", "Most companies use software to filter resumes before a human sees them. Help the software read yours:"),
        ("list", ["Copy important keywords from the job description into your Skills and Projects (only if you really know them).",
                  "Use standard headings: Skills, Projects, Experience, Education.",
                  "Avoid tables, text boxes, images and two-column layouts for important information.",
                  "Send a PDF unless the company asks for Word, and name it Firstname_Lastname_Resume.pdf."]),
      ]),
      ("Myth vs fact", "psychology_alt", [
        ("myths", [("More pages look more impressive.", "One page is perfect for freshers. Recruiters prefer short and sharp."),
                   ("A colourful Canva design will stand out.", "Fancy layouts often confuse ATS software. Simple and clean wins."),
                   ("Low CGPA means no chance.", "Check the cutoff (often 60% or 6.0 CGPA). Once you clear it, projects and skills matter far more."),
                   ("I have no experience, so nothing to write.", "Projects, hackathons, college events and freelance work all count as experience.")]),
      ]),
      ("Do's and don'ts", "rule", [
        ("dodont", (["Tailor your resume for each job role", "Use numbers to show impact", "Proofread twice and ask a friend to check", "Keep fonts and spacing consistent"],
                    ["Add a photo, date of birth, religion or father's name (not needed for most private jobs)", "Write \"Objective: To work in a reputed organisation\"", "Leave spelling or grammar mistakes", "Add skills you cannot answer questions on"])),
      ]),
    ],
    plan=["Make a 1-page draft using the structure above", "Rewrite 2–3 project points with the action + tech + result formula",
          "Add working GitHub and LinkedIn links", "Tailor keywords for one real job description",
          "Get 2 people to review it for mistakes", "Export as Firstname_Lastname_Resume.pdf"]),

  dict(slug="cover-letters", phase=0, title="Cover Letters", icon="mail",
    short="Short letters that sound like you",
    kicker="Cover Letters",
    h1="Cover letters that sound like you, not like a template",
    sub="A good cover letter is short, specific and shows you actually care about this job. Here is a simple formula you can reuse in 15 minutes.",
    chips=[("short_text", "150–250 words"), ("view_agenda", "3 short paragraphs"), ("tune", "Tailored every time")],
    sections=[
      ("When do you need one?", "help", [
        ("list", ["When the job portal asks for it (always write one then).",
                  "Cold emails to HR or founders at startups.",
                  "Referral requests: a short version helps your referrer.",
                  "When you need to explain something: a career gap, a change of field, or relocating."]),
      ]),
      ("The 3-paragraph formula", "format_list_numbered", [
        ("steps", ["<b>Hook:</b> the role you are applying for, where you found it, and one strong line about you.",
                   "<b>Proof:</b> 1–2 projects or skills that match the job description, with results.",
                   "<b>Close:</b> why this company, your availability, and a thank-you."]),
      ]),
      ("Sample: fresher applying for Junior Data Analyst", "draft", [
        ("paper", [("Dear Hiring Team,", ""),
                   ("", "I'm applying for the Junior Data Analyst role I found on LinkedIn. I recently built a sales dashboard in Power BI for a local electronics store that helped the owner spot his top 10 products in one view."),
                   ("", "In my final-year project I cleaned and analysed 50,000 rows of sales data using Python (pandas) and SQL, and presented weekly trends to my faculty guide. I enjoy turning messy data into clear answers, which matches what your job description asks for."),
                   ("", "I'm excited about how your team uses data to improve customer experience. I can join immediately and would love the chance to discuss how I can contribute. Thank you for your time."),
                   ("Regards, Priya Sharma", "+91 98XXX XXXXX · linkedin.com/in/priya-sharma")]),
      ]),
      ("Make the first line count", "bolt", [
        ("compare", ("I am writing to apply for the post of Software Engineer in your esteemed organisation.",
                     "I built a bus-tracking app that 200+ students in my college use every day, and I'd love to bring that same problem-solving to your Software Engineer role.")),
      ]),
      ("Cold email to HR (startups love this)", "send", [
        ("script", [("Subject", "Fresher Python Developer: built 3 live projects | Immediate joiner"),
                    ("You", "Hi Ms. Mehta, I came across your opening for a Python Developer on LinkedIn."),
                    ("You", "I'm a 2025 B.Tech graduate and recently built a FastAPI service that handles 1,000+ requests a day for a college event app."),
                    ("You", "I've attached my resume and GitHub. Could I have 10 minutes to show you my work? Thank you!")]),
        ("tip", ("schedule", "Keep cold emails under 120 words. Send them on weekday mornings and follow up once after 5–7 days if there is no reply.", "teal")),
      ]),
      ("Do's and don'ts", "rule", [
        ("dodont", (["Use the hiring manager's name if you can find it", "Mention the exact job title", "Match 2–3 keywords from the job description", "Keep it to one page or less"],
                    ["Copy-paste the same letter for every company", "Repeat your whole resume", "Use over-formal phrases like \"esteemed organisation\"", "Forget to change the company name (it happens!)"])),
      ]),
    ],
    plan=["Write a base cover letter using the 3-paragraph formula", "Rewrite your first line so it shows a real result",
          "Tailor it for one actual job posting", "Draft a 120-word cold email for a startup", "Send it and set a reminder to follow up in a week"]),

  dict(slug="linkedin-naukri", phase=0, title="LinkedIn & Naukri Profile", icon="badge",
    short="Make recruiters find you",
    kicker="Profile Building",
    h1="Make recruiters find you on LinkedIn and Naukri",
    sub="Recruiters search for candidates every day. A complete, keyword-rich profile means they can find you, even if you never applied.",
    chips=[("search", "Be searchable"), ("photo_camera", "Look professional"), ("forum", "Network smartly")],
    sections=[
      ("LinkedIn profile checklist", "checklist", [
        ("cards", [("account_circle", "Professional photo", "Clear face, plain background, smile. Phone camera is fine."),
                   ("title", "Strong headline", "Your target role + key skills + proof. Not just \"Student at XYZ College\"."),
                   ("article", "About section", "3–4 short lines: what you do, what you built, what you're looking for."),
                   ("star", "Featured projects", "Pin your best GitHub repos, demos or certificates."),
                   ("verified", "Skills", "Add 10–15 relevant skills. Ask friends to endorse the top ones."),
                   ("link", "Custom URL", "linkedin.com/in/your-name instead of random numbers.")]),
      ]),
      ("Fix your headline", "edit", [
        ("compare", ("Student at XYZ Engineering College",
                     "Aspiring Data Engineer | Python · SQL · PySpark | Built 3 end-to-end data pipelines")),
      ]),
      ("Naukri profile tips", "work", [
        ("list", ["Complete your profile to 100%: incomplete profiles appear lower in recruiter searches.",
                  "Write a resume headline with your role and top skills.",
                  "Add 10–15 key skills that match the jobs you want.",
                  "Refresh your profile every week (update a skill or line). Recently active profiles tend to get noticed first.",
                  "As a fresher, mark yourself as an immediate joiner and keep preferred locations flexible."]),
      ]),
      ("Post to get noticed", "campaign", [
        ("steps", ["<b>Share a project:</b> what you built, a screenshot, what you learned, and the GitHub link.",
                   "<b>Share learnings:</b> \"3 things I learned building my first ETL pipeline\".",
                   "<b>Celebrate milestones:</b> certifications and hackathons, with what you learned, not just the badge.",
                   "<b>Comment thoughtfully</b> on posts by people in your target companies. Real comments get noticed."]),
      ]),
      ("Message a senior for guidance", "chat", [
        ("script", [("You", "Hi Rahul sir, I'm a final-year student from your college (2025 batch). I saw you work as a Data Engineer at XYZ."),
                    ("You", "I'm preparing for data roles and recently built a pipeline project (link). Could you share one tip on what your team looks for in freshers?"),
                    ("You", "Thank you so much for your time!")]),
        ("tip", ("lightbulb", "Ask for advice first, not a job. People happily give advice, and a referral often follows naturally.", "")),
      ]),
    ],
    plan=["Upload a professional photo and banner", "Rewrite your headline with role + skills + proof",
          "Write a 4-line About section", "Pin 2 projects in Featured", "Complete your Naukri profile to 100%",
          "Send 3 thoughtful messages to seniors or alumni"]),

  dict(slug="communication-skills", phase=0, title="Communication Skills", icon="campaign",
    short="Clear English beats fancy English",
    kicker="Communication Skills",
    h1="Good English is a skill, and skills can be learned",
    sub="You don't need a fancy accent or big words. Interviewers want clear, confident and structured answers. Twenty minutes a day is enough to get there.",
    chips=[("record_voice_over", "Clear > complex"), ("timer", "20 minutes a day"), ("trending_up", "Visible in 30 days")],
    sections=[
      ("You don't need fancy English", "sentiment_satisfied", [
        ("tip", ("lightbulb", "Short sentences, simple words, and a calm pace beat difficult vocabulary every time. Many successful engineers in top companies speak simple English. They are just clear.", "")),
      ]),
      ("Your daily 20-minute practice", "timer", [
        ("timeline", [("5 minutes", "Read an article or news story aloud. Focus on pronunciation and pace."),
                      ("5 minutes", "Record yourself answering one interview question. Listen once and note one thing to fix."),
                      ("5 minutes", "Learn 3 useful phrases and use each one in a sentence of your own."),
                      ("5 minutes", "Shadow a short English video: pause, repeat the sentence, copy the tone.")]),
      ]),
      ("Fix common mistakes", "spellcheck", [
        ("table", (["Instead of", "Say"], [["I am having 2 years of experience", "I have 2 years of experience"],
                                           ["Myself Rahul", "I am Rahul / My name is Rahul"],
                                           ["Please revert back", "Please reply / Please get back to me"],
                                           ["Do the needful", "Could you please help with this?"],
                                           ["Discuss about the project", "Discuss the project"],
                                           ["I am not knowing", "I don't know"]])),
      ]),
      ("Speak with structure: the PREP method", "account_tree", [
        ("steps", ["<b>Point:</b> say your answer first. \"I prefer working in teams.\"",
                   "<b>Reason:</b> why. \"Because different ideas lead to better solutions.\"",
                   "<b>Example:</b> a real story. \"In our final-year project, my teammate's idea cut our build time in half.\"",
                   "<b>Point again:</b> close the loop. \"That's why I enjoy team work.\""]),
      ]),
      ("Email etiquette", "mail", [
        ("dodont", (["Clear subject line", "Greeting with name: \"Hi Ms. Rao,\"", "Short paragraphs, one idea each", "Sign off with your full name and phone"],
                    ["ALL CAPS or lots of !!!", "SMS language like \"pls\", \"u\", \"plz revert\"", "Very long emails", "Sending without reading it once"])),
      ]),
      ("Find practice partners", "group", [
        ("list", ["An \"English-only hour\" with friends every day.",
                  "Mock interviews with classmates: take turns as interviewer.",
                  "Public speaking clubs such as Toastmasters, or your college's speaking club.",
                  "Explain a technical topic to a junior: teaching is the best practice."]),
      ]),
    ],
    plan=["Do the 20-minute practice for 7 days in a row", "Record and listen to your \"Tell me about yourself\"",
          "Replace 3 common mistakes in your speech", "Answer 3 questions using the PREP method", "Have one English-only hour with friends"]),

  dict(slug="confidence-mindset", phase=0, title="Confidence & Mindset", icon="self_improvement",
    short="Your college doesn't decide your future",
    kicker="Confidence & Mindset",
    h1="Your college doesn't decide your future. Your effort does.",
    sub="Many students from tier-2 and tier-3 colleges feel they are behind before they even start. Here is the truth, and a toolkit to build real confidence.",
    chips=[("favorite", "Self-belief"), ("fitness_center", "Daily habits"), ("psychology", "Handle rejection")],
    sections=[
      ("Beat the tier-2 mindset", "psychology_alt", [
        ("myths", [("Big companies don't hire from my college.", "Many large companies run off-campus tests open to every eligible student, wherever you studied."),
                   ("I'm not smart enough.", "Interviews test preparation more than talent. Consistent practice beats last-minute genius."),
                   ("Everyone else is ahead of me.", "Social media shows highlights, not struggles. Compare yourself with who you were last month."),
                   ("My English isn't good enough.", "Clear, simple English is enough, and it improves fast with daily practice.")]),
      ]),
      ("Interview nerves toolkit", "spa", [
        ("cards", [("air", "Box breathing", "Breathe in for 4 seconds, hold 4, out 4, hold 4. Repeat 4 times before you join."),
                   ("accessibility_new", "Power posture", "Sit or stand straight for 2 minutes before the interview. Your body tells your brain you are ready."),
                   ("checklist", "Preparation", "Confidence comes from preparation. Practise your top 10 answers out loud."),
                   ("bolt", "Reframe nerves", "Say \"I'm excited\" instead of \"I'm nervous\". The feeling is the same; the meaning changes.")]),
      ]),
      ("Handling rejection like a pro", "replay", [
        ("steps", ["<b>Feel it, then move on:</b> give yourself one evening, not one week.",
                   "<b>Write down</b> every question you were asked while it's fresh.",
                   "<b>Find the gap:</b> was it technical, communication, or nerves?",
                   "<b>Fix one thing</b> this week and apply to the next opportunity.",
                   "<b>Remember:</b> most people who get placed were rejected several times first."]),
      ]),
      ("Build a winning routine", "event_repeat", [
        ("timeline", [("Morning", "30 minutes of coding or aptitude, while your mind is fresh."),
                      ("Afternoon", "Learn one new concept and add a small piece to your project."),
                      ("Evening", "20 minutes of communication practice, then apply to 3–5 jobs."),
                      ("Night", "Write down 3 things you did today. Small wins add up.")]),
      ]),
      ("Words to remember", "format_quote", [
        ("tip", ("format_quote", "Your college name is printed once on your resume. Your skills show up in every answer you give.", "teal")),
      ]),
    ],
    plan=["Write down 3 limiting beliefs and the fact that beats each one", "Practise box breathing once a day for a week",
          "Follow the daily routine for 5 days", "Write your top 10 interview answers", "Start a \"small wins\" note on your phone"]),

  # ------------------------------------------------------------------ GET SHORTLISTED
  dict(slug="job-applications", phase=1, title="Job Applications", icon="send",
    short="Apply smart, not just more",
    kicker="Job Applications",
    h1="Apply smart, not just more",
    sub="Sending hundreds of random applications feels productive. A focused, tracked and tailored system usually gets you far more interview calls.",
    chips=[("target", "Targeted"), ("table_chart", "Tracked"), ("diversity_3", "Referral-powered")],
    sections=[
      ("Where to find fresher jobs", "travel_explore", [
        ("cards", [("work", "Naukri & LinkedIn Jobs", "The biggest boards. Set job alerts for your exact role and city."),
                   ("school", "Internshala", "Internships and fresher roles, many with a pre-placement offer (PPO)."),
                   ("rocket_launch", "Startup job boards", "Wellfound (AngelList), Instahyre and Cutshort list startups that hire on skills."),
                   ("apartment", "Company career pages", "Some roles are posted only here. Check your top 20 companies weekly."),
                   ("campaign", "Pool & off-campus drives", "Large IT companies run national hiring tests. Watch their careers pages."),
                   ("diversity_3", "Referrals", "A referral can get your resume read by a human. Ask alumni and seniors.")]),
      ]),
      ("The weekly application system", "event_repeat", [
        ("steps", ["<b>Shortlist</b> 10 companies and roles that match your skills.",
                   "<b>Tailor</b> your resume keywords for each role (10 minutes each).",
                   "<b>Apply early:</b> within the first few days of a posting, when fewer people have applied.",
                   "<b>Ask for a referral</b> from someone at the company.",
                   "<b>Track everything</b> in a simple sheet (template below).",
                   "<b>Follow up</b> politely after 7–10 days."]),
      ]),
      ("Your job tracker template", "table_chart", [
        ("table", (["Company", "Role", "Applied on", "Referral?", "Status", "Next step"],
                   [["ABC Tech", "Python Developer", "12 Mar", "Yes (senior)", "Test scheduled", "Practise arrays"],
                    ["XYZ Analytics", "Data Analyst", "14 Mar", "No", "Applied", "Follow up 24 Mar"],
                    ["Startup Q", "Backend Intern", "15 Mar", "Cold email", "Interview", "Prepare project story"]])),
        ("tip", ("lightbulb", "Make this in Google Sheets or Excel. Seeing your progress keeps you motivated and stops you missing follow-ups.", "")),
      ]),
      ("Ask for a referral the right way", "diversity_3", [
        ("script", [("You", "Hi Anjali, I'm Karthik, a 2025 graduate from your college. I saw an opening for a Junior Java Developer at your company (link)."),
                    ("You", "I've built two Spring Boot projects (GitHub link) and my skills match the role closely."),
                    ("You", "Would you be comfortable referring me? I've attached my resume and I'm happy to answer any questions. Thank you!")]),
      ]),
      ("Stay safe: avoid job scams", "gpp_maybe", [
        ("tip", ("warning", "Real companies <b>never</b> ask you to pay for a job, training, \"registration\" or a laptop deposit. If someone asks for money, it's a scam.", "rose")),
        ("list", ["Offer letter without any interview? Be suspicious.",
                  "\"HR\" using a personal Gmail or WhatsApp-only contact? Verify on the official website.",
                  "Never share OTPs, bank passwords or card details.",
                  "Salary that sounds too good for a fresher role? Research it on Glassdoor or AmbitionBox first."]),
      ]),
    ],
    plan=["Create your job tracker sheet", "Set job alerts on Naukri and LinkedIn for your role",
          "Shortlist 10 target companies", "Apply to 5 roles with a tailored resume", "Ask 2 people for referrals", "Read the scam checklist once more"]),

  dict(slug="off-campus-jobs", phase=1, title="Off-Campus Job Hunt", icon="travel_explore",
    short="No campus placement? No problem.",
    kicker="Off-Campus Job Hunt",
    h1="No campus placement? Off-campus is your highway.",
    sub="If good companies don't visit your college, go to them. Off-campus hiring is open, skills-based, and it's how many tier-2 and tier-3 students land great jobs.",
    chips=[("public", "Open to all"), ("bolt", "Skills-based"), ("calendar_month", "90-day plan")],
    sections=[
      ("Why off-campus works for you", "thumb_up", [
        ("cards", [("apartment", "More companies", "Far more companies hire off-campus than visit any single college."),
                   ("quiz", "Tests judge skills", "Online tests don't check your college name, just your answers."),
                   ("rocket_launch", "Startups love projects", "A strong GitHub can beat a famous college tag at a startup."),
                   ("laptop_mac", "Remote options", "Many roles let you work from your home town.")]),
      ]),
      ("Off-campus channels", "hub", [
        ("list", ["National hiring tests and drives by large IT services companies (for example TCS NQT). Watch their careers pages and register early.",
                  "Hiring hackathons and coding contests: companies use them to find talent.",
                  "LinkedIn and Naukri job posts, especially in the first few days.",
                  "Startup job boards and cold emails to founders.",
                  "Internships that convert into full-time offers (PPOs).",
                  "Referrals from alumni, seniors and online communities."]),
      ]),
      ("Your 90-day off-campus plan", "calendar_month", [
        ("timeline", [("Weeks 1–2", "Fix your resume, LinkedIn and GitHub. Pick one target role."),
                      ("Weeks 3–6", "Daily aptitude and coding practice, and build 2 solid projects."),
                      ("Weeks 7–10", "Apply to 5 jobs a day, ask for referrals, join contests and hiring challenges."),
                      ("Weeks 11–13", "Mock interviews, real interviews, follow-ups. Keep applying until you sign an offer.")]),
      ]),
      ("Build proof, not just certificates", "verified", [
        ("compare", ("10 online certificates with no projects to show.",
                     "2 certificates + 3 projects on GitHub with a README, screenshots and a live demo link.")),
        ("tip", ("lightbulb", "Certificates show you studied. Projects show you can do the job. Recruiters care more about the second.", "")),
      ]),
      ("Do's and don'ts", "rule", [
        ("dodont", (["Start before your final semester ends", "Apply daily, even on tough days", "Join student and developer communities", "Keep learning while you apply"],
                    ["Wait for results or a \"perfect\" resume", "Pay agents or consultants for job guarantees", "Apply only to famous companies", "Stop after a few rejections"])),
      ]),
    ],
    plan=["Pick one target role", "Register for one national hiring test", "Start the 90-day plan today",
          "Push one project to GitHub with a README", "Join 2 developer communities", "Apply to 5 off-campus roles this week"]),

  dict(slug="aptitude-coding", phase=1, title="Aptitude & Coding Rounds", icon="calculate",
    short="Clear the online test every time",
    kicker="Aptitude & Coding Rounds",
    h1="Clear the online test, every single time",
    sub="Most hiring starts with an online test. It's the biggest filter, and also the most predictable. Practise the right topics daily and you will clear it.",
    chips=[("functions", "Quant + Reasoning"), ("code", "Coding"), ("schedule", "60 minutes a day")],
    sections=[
      ("What the test usually has", "quiz", [
        ("cards", [("calculate", "Quantitative aptitude", "Maths questions under time pressure."),
                   ("extension", "Logical reasoning", "Patterns, puzzles and arrangements."),
                   ("menu_book", "Verbal English", "Reading, grammar and vocabulary."),
                   ("code", "Coding", "Usually 1–3 problems in a language of your choice."),
                   ("memory", "CS fundamentals", "Sometimes: pseudo-code, DBMS, OS, networking basics."),
                   ("mic", "Communication test", "Some companies add a spoken English test.")]),
      ]),
      ("Topics that come up most", "star", [
        ("table", (["Section", "Focus on these first"],
                   [["Quant", "Percentages, profit & loss, time-speed-distance, time & work, ratios, averages, basic probability"],
                    ["Reasoning", "Number series, blood relations, seating arrangement, syllogisms, coding-decoding"],
                    ["Verbal", "Reading comprehension, sentence correction, fill in the blanks"],
                    ["Coding", "Arrays, strings, hashing, two pointers, sorting, basic recursion; then trees and graphs for product companies"]])),
      ]),
      ("Your daily 60-minute plan", "timer", [
        ("timeline", [("20 minutes", "Quant: one topic a day, 15 questions with a timer."),
                      ("15 minutes", "Reasoning: 10 questions, mixed topics."),
                      ("25 minutes", "Coding: one easy or medium problem. Read others' solutions after you try.")]),
      ]),
      ("Free places to practise", "public", [
        ("list", ["Aptitude: IndiaBIX and the aptitude sections on GeeksforGeeks.",
                  "Coding: LeetCode, HackerRank, GeeksforGeeks practice.",
                  "Contests: CodeChef and Codeforces, to practise under time pressure.",
                  "Previous papers: search \"<company name> previous year questions\" before each test."]),
      ]),
      ("Test-day rules", "fact_check", [
        ("dodont", (["Test your webcam, mic and internet the day before", "Read the proctoring rules carefully", "Solve the easy questions first", "Submit partial code: passing some test cases still earns marks"],
                    ["Switch tabs or open other apps (it can disqualify you)", "Get stuck on one hard question for too long", "Use your phone near the screen", "Panic if one section goes badly: keep going"])),
      ]),
    ],
    plan=["Take one full mock test to find your weak areas", "Follow the 60-minute plan for 7 days",
          "Solve 20 array and string problems", "Practise 2 timed aptitude sets", "Read one company's previous-year questions"]),

  # ------------------------------------------------------------------ CRACK THE INTERVIEW
  dict(slug="interview-prep", phase=2, title="Interview Prep", icon="record_voice_over",
    short="Your complete interview game plan",
    kicker="Interview Prep",
    h1="Your complete interview game plan",
    sub="Interviews follow patterns. Know the rounds, prepare your stories, and practise out loud. That is 80% of the game.",
    chips=[("layers", "Know every round"), ("mic", "Practise out loud"), ("calendar_month", "30-day plan")],
    sections=[
      ("Types of interview rounds", "layers", [
        ("cards", [("quiz", "Online test", "Aptitude, reasoning and coding. The first filter."),
                   ("code", "Technical round", "Core subjects, your projects and problem solving."),
                   ("terminal", "Live coding", "Solve a problem while explaining your thinking."),
                   ("groups", "Group discussion", "Some companies use GDs for mass hiring."),
                   ("supervisor_account", "Managerial round", "How you think, work in teams and handle situations."),
                   ("handshake", "HR round", "Attitude, fit, salary and joining details.")]),
      ]),
      ("Top questions to prepare", "help", [
        ("qa", [("Tell me about yourself.", "Present (who you are and your skills) → Past (projects or internship) → Future (why this role). Keep it to about 60–90 seconds."),
                ("Explain your best project.", "Problem → your role → tech stack → one challenge and how you solved it → result with a number."),
                ("Why should we hire you?", "Match 2–3 of your skills to their job description, add one proof, and show eagerness to learn."),
                ("What are your strengths and weaknesses?", "Strength with an example. A real but fixable weakness, plus what you are doing about it."),
                ("Why this company?", "Mention their product, technology or values specifically. Generic answers sound fake."),
                ("Where do you see yourself in 5 years?", "Growing in this field, taking more responsibility, with skills that add value to the team.")]),
      ]),
      ("Tell your project story with STAR", "auto_stories", [
        ("steps", ["<b>Situation:</b> \"Our college canteen had long queues every lunch break.\"",
                   "<b>Task:</b> \"Our team of 3 had to build an ordering app in 6 weeks.\"",
                   "<b>Action:</b> \"I built the backend in Node.js and designed the order queue.\"",
                   "<b>Result:</b> \"Average waiting time dropped from 20 to 8 minutes.\""]),
      ]),
      ("The mock interview method", "videocam", [
        ("steps", ["Pick 5 questions and set a timer.", "Answer out loud and record yourself on your phone.",
                   "Watch it back: note filler words, pace and eye contact.", "Swap roles with a friend once a week.",
                   "Repeat until each answer feels natural, not memorised."]),
      ]),
      ("Your 30-day interview plan", "calendar_month", [
        ("timeline", [("Week 1", "Revise core subjects for your role, and write your project stories."),
                      ("Week 2", "Top 20 technical questions plus 2 coding problems a day."),
                      ("Week 3", "HR answers with PREP and STAR, and mock interviews with friends."),
                      ("Week 4", "Company research, full mock rounds, and a last revision of weak areas.")]),
      ]),
    ],
    plan=["Write your \"Tell me about yourself\" (60–90 seconds)", "Prepare 2 project stories with STAR",
          "Answer all 6 top questions out loud", "Record one mock interview and watch it", "Do one mock with a friend", "Start the 30-day plan"]),

  dict(slug="group-discussion", phase=2, title="Group Discussion", icon="groups",
    short="Speak up in a GD without fear",
    kicker="Group Discussion",
    h1="Speak up in a group discussion without fear",
    sub="A GD isn't a fight to be the loudest. Evaluators look for clear thinking, good listening and the person who moves the discussion forward.",
    chips=[("hearing", "Listen first"), ("lightbulb", "Add value"), ("flag", "Lead politely")],
    sections=[
      ("What evaluators look for", "visibility", [
        ("cards", [("lightbulb", "Content", "Relevant points, facts and examples."),
                   ("record_voice_over", "Communication", "Clear, simple, confident speech."),
                   ("hearing", "Listening", "Building on others' points, not ignoring them."),
                   ("flag", "Leadership", "Starting, guiding or summarising, without dominating."),
                   ("handshake", "Teamwork", "Including quiet members and staying respectful.")]),
      ]),
      ("Ways to start the GD", "play_arrow", [
        ("list", ["With a definition: \"Let's first understand what remote work means for freshers...\"",
                  "With a question: \"Will AI take more jobs than it creates? Let's look at both sides.\"",
                  "With an example from India: UPI, ISRO's missions, startup growth.",
                  "With a fact, but only if you're sure it's correct."]),
        ("tip", ("lightbulb", "Starting gets attention, but only if your opening is good. If you're unsure, make the second or third point strongly instead.", "")),
      ]),
      ("Phrases that help", "chat", [
        ("script", [("Agree", "\"I agree with Ravi, and I'd like to add one more point...\""),
                    ("Disagree", "\"I see it a little differently. In my view...\""),
                    ("Add value", "\"Building on that idea, let's also consider...\""),
                    ("Bring back", "\"We seem to be going off-topic. Can we come back to...?\""),
                    ("Include others", "\"Priya, we haven't heard your view yet. What do you think?\""),
                    ("Conclude", "\"To sum up, we discussed three points...\"")]),
      ]),
      ("Common GD topics to practise", "topic", [
        ("cards", [("smart_toy", "AI and jobs", "Will AI create more jobs than it takes away?"),
                   ("home_work", "Work from home vs office", "Which is better for freshers?"),
                   ("payments", "Digital India & UPI", "How digital payments changed India."),
                   ("school", "Online vs classroom learning", "Can online education replace colleges?"),
                   ("rocket_launch", "Startups vs MNCs", "Where should a fresher start their career?"),
                   ("share", "Social media", "Boon or bane for young people?")]),
      ]),
      ("Do's and don'ts", "rule", [
        ("dodont", (["Make eye contact with everyone, not only the evaluator", "Speak 3–4 times with quality points", "Note down points while others speak", "Stay calm if someone interrupts"],
                    ["Shout or speak over others", "Stay silent the whole time", "Point fingers or get personal", "Repeat what was already said"])),
      ]),
    ],
    plan=["Learn the 6 helpful phrases", "Practise 2 GD topics with friends", "Try starting one GD and concluding another",
          "Read the news for 10 minutes daily for examples", "Ask a friend for honest feedback after a mock GD"]),

  dict(slug="before-interview", phase=2, title="Before the Interview", icon="event_upcoming",
    short="Win it before it starts",
    kicker="Before the Interview",
    h1="Win the interview before it even starts",
    sub="Most interview mistakes happen because of poor preparation, not lack of knowledge. Follow this countdown and walk in calm.",
    chips=[("event_upcoming", "Countdown plan"), ("travel_explore", "Company research"), ("checklist", "Ready kit")],
    sections=[
      ("Your interview countdown", "hourglass_top", [
        ("timeline", [("1 week before", "Research the company and role. Revise the core subjects in the job description."),
                      ("2 days before", "Practise your top answers out loud. Re-read your own resume line by line."),
                      ("Night before", "Prepare documents or your setup. Sleep well; no late-night cramming."),
                      ("Morning of", "Light revision of key points, a good breakfast, and leave early."),
                      ("15 minutes before", "Breathe, smile, phone on silent. Join online calls 5–10 minutes early.")]),
      ]),
      ("Research the company", "travel_explore", [
        ("list", ["What they do: products, services and main clients.",
                  "Recent news: new launches, funding or awards.",
                  "The role: re-read the job description and match each line to your experience.",
                  "Interview process: check Glassdoor, AmbitionBox or ask people who work there.",
                  "One thing you genuinely like about them, for \"Why this company?\""]),
      ]),
      ("What to carry and set up", "inventory_2", [
        ("cards", [("print", "In-person", "Printed resumes (3 copies), ID proof, documents and certificates, a pen and a notebook."),
                   ("laptop_mac", "Online", "Charged laptop, stable internet with a mobile hotspot as backup, earphones with mic."),
                   ("light_mode", "Your space", "Quiet room, good light on your face, plain background, camera at eye level."),
                   ("link", "Links & logins", "Test the meeting link and software the day before.")]),
      ]),
      ("Dress code", "checkroom", [
        ("dodont", (["Formal or smart-casual: clean, ironed shirt", "Neat hair, simple accessories", "Comfortable formal shoes", "Dress fully even for online interviews"],
                    ["T-shirts with big prints or slogans", "Strong perfume", "Wrinkled clothes", "Distracting jewellery or noisy accessories"])),
      ]),
      ("Last-minute mindset", "self_improvement", [
        ("tip", ("format_quote", "The interviewer wants you to do well: they need to hire someone. Think of it as a conversation, not an exam.", "teal")),
      ]),
    ],
    plan=["Research the company for 30 minutes", "Match every job-description line to your experience",
          "Prepare your documents or online setup", "Test your internet, camera and mic", "Pick and iron your clothes", "Sleep at least 7 hours"]),

  dict(slug="during-interview", phase=2, title="During the Interview", icon="forum",
    short="Stay calm, think aloud, shine",
    kicker="During the Interview",
    h1="Stay calm, think aloud and shine",
    sub="You've prepared. Now it's about showing it: a strong start, clear answers, honest \"I don't know\"s and good questions at the end.",
    chips=[("waving_hand", "Strong start"), ("psychology", "Think aloud"), ("help", "Ask smart questions")],
    sections=[
      ("The first 2 minutes", "timer", [
        ("steps", ["<b>Greet</b> with a smile: \"Good morning, thank you for having me.\"",
                   "<b>Sit straight</b>, hands visible, phone away.",
                   "<b>Wait</b> to be offered a seat in person; on video, look at the camera, not the screen.",
                   "<b>Breathe</b> and speak a little slower than normal."]),
      ]),
      ("\"Tell me about yourself\"", "person", [
        ("compare", ("I am Rahul. I am from Nagpur. My father is a businessman. I completed my 12th with 78%. My hobbies are cricket and music.",
                     "I'm Rahul, a final-year Computer Science student who enjoys building backend systems. I've built two projects in Java and Spring Boot, including a library app used by 300 students. I'm now looking for a backend developer role where I can keep learning and contribute from day one.")),
        ("tip", ("lightbulb", "Formula: <b>Present</b> (who you are, key skills) → <b>Past</b> (projects or internship) → <b>Future</b> (why this role). Skip family details and percentages unless asked.", "")),
      ]),
      ("When you don't know the answer", "help", [
        ("script", [("Interviewer", "Have you worked with Kubernetes?"),
                    ("You", "Not yet in a project, but I understand it manages containers at scale. I've used Docker, so I'd learn Kubernetes quickly. Could I tell you how I used Docker?")]),
        ("tip", ("verified", "Honesty plus a related skill beats bluffing every time. Interviewers can tell when you're guessing.", "teal")),
      ]),
      ("Technical round: think aloud", "psychology", [
        ("steps", ["<b>Clarify</b> the question and ask about edge cases.", "<b>Try an example</b> by hand first.",
                   "<b>Explain a simple solution</b>, even if it's slow.", "<b>Improve it</b> step by step and explain the trade-off.",
                   "<b>Test</b> with an example before you say \"done\"."]),
      ]),
      ("Smart questions to ask at the end", "question_answer", [
        ("list", ["What does a typical day look like for someone in this role?",
                  "What technologies will I work with in the first few months?",
                  "How do you support freshers in learning and growing?",
                  "What would success look like for me after 6 months?"]),
      ]),
      ("Body language", "accessibility_new", [
        ("dodont", (["Steady eye contact (camera, for online)", "Nod and show you're listening", "Use your hands naturally while explaining", "Smile when appropriate"],
                    ["Cross your arms or slouch", "Look at your phone or another screen", "Interrupt the interviewer", "Say \"I'm very nervous\" repeatedly"])),
      ]),
    ],
    plan=["Practise your first 2 minutes in front of a mirror", "Rewrite \"Tell me about yourself\" with Present → Past → Future",
          "Practise one honest \"I don't know\" answer", "Solve one coding problem while thinking aloud", "Prepare 3 questions to ask"]),

  dict(slug="hr-round-salary", phase=2, title="HR Round & Salary Talk", icon="handshake",
    short="Handle HR and talk money confidently",
    kicker="HR Round & Salary",
    h1="Handle the HR round and talk money with confidence",
    sub="The HR round checks attitude and fit, and it's where salary comes up. Know the terms and prepare honest, positive answers.",
    chips=[("sentiment_satisfied", "Positive attitude"), ("currency_rupee", "Know your CTC"), ("description", "Read the offer")],
    sections=[
      ("Common HR questions", "help", [
        ("qa", [("Why should we hire you?", "Connect your skills to their needs with one example, and show you're eager to learn and committed."),
                ("Are you willing to relocate?", "Answer honestly. If yes, say it positively: \"Yes, I'm open to relocating for the right opportunity.\""),
                ("Do you have any backlogs or a gap year?", "Be honest and brief, then show what you learned or did during that time. Never hide it: it comes out in background checks."),
                ("Are you comfortable with a service agreement (bond)?", "Ask for the details first: duration, amount and conditions. Then decide calmly."),
                ("Do you have other offers?", "Be honest. It's fine to say you're interviewing elsewhere, and that this role is your preference if it is.")]),
      ]),
      ("Salary basics every fresher must know", "currency_rupee", [
        ("cards", [("account_balance_wallet", "CTC", "Cost to Company: the total yearly cost, including things you may not get in hand."),
                   ("payments", "In-hand salary", "What reaches your bank each month after tax, PF and other deductions."),
                   ("trending_up", "Variable pay", "A performance bonus that is not guaranteed. Check what percentage of CTC it is."),
                   ("redeem", "Joining bonus", "A one-time amount. Sometimes must be repaid if you leave early."),
                   ("gavel", "Service agreement", "A commitment to stay a minimum time. Read the exit conditions."),
                   ("event", "Notice period", "How long you must work after resigning. Freshers often have 30–90 days.")]),
      ]),
      ("\"What is your expected salary?\"", "chat", [
        ("script", [("HR", "What salary are you expecting?"),
                    ("You", "I'm a fresher, so learning and growth matter most to me. Based on my research for this role, I was expecting something in the range of 4 to 5 LPA. I'm open to discussing what fits your structure.")]),
        ("tip", ("lightbulb", "Research the typical range for the role and city on Glassdoor or AmbitionBox before you answer. For mass-recruiter roles, salary is usually fixed, so don't push hard.", "")),
      ]),
      ("Before you accept the offer letter", "fact_check", [
        ("list", ["Role, location and joining date are correct.",
                  "CTC breakup: fixed, variable and benefits.",
                  "Service agreement or bond terms, if any.",
                  "Probation period and notice period.",
                  "Documents needed for background verification."]),
      ]),
      ("Myth vs fact", "psychology_alt", [
        ("myths", [("CTC is what I'll get in my account.", "In-hand pay is lower than CTC/12 after tax, PF and variable pay."),
                   ("Asking about salary looks greedy.", "It's a normal, professional question, especially in the HR round."),
                   ("Freshers can never negotiate.", "Fixed-salary mass roles rarely change, but startups and product companies sometimes do.")]),
      ]),
    ],
    plan=["Prepare honest answers to the 5 HR questions", "Learn the 6 salary terms",
          "Research the salary range for your target role", "Practise the expected-salary answer out loud", "Make your offer-letter checklist"]),

  # ------------------------------------------------------------------ WIN THE OFFER
  dict(slug="after-interview", phase=3, title="After the Interview", icon="mark_email_read",
    short="Follow up, learn, and close strong",
    kicker="After the Interview",
    h1="What you do after the interview matters too",
    sub="A thank-you note, a polite follow-up and a smart response to results, good or bad, keep doors open and make you better every time.",
    chips=[("mail", "Thank-you note"), ("schedule", "Follow-up timeline"), ("replay", "Comeback plan")],
    sections=[
      ("Thank-you email (within 24 hours)", "mail", [
        ("paper", [("Subject: Thank you, Python Developer interview", ""),
                   ("Hi Mr. Iyer,", "Thank you for taking the time to interview me today. I enjoyed discussing the API project and learning about how your team builds payment systems."),
                   ("", "Our conversation made me even more excited about the role. Please let me know if you need anything else from me."),
                   ("Regards, Sneha Patil", "+91 98XXX XXXXX")]),
      ]),
      ("Follow-up timeline", "schedule", [
        ("timeline", [("Day 1", "Send the thank-you email."),
                      ("Day 7", "If you haven't heard back, send one short, polite follow-up."),
                      ("Day 14", "A final follow-up. After that, keep applying elsewhere and don't wait.")]),
      ]),
      ("Got rejected? Your comeback plan", "replay", [
        ("steps", ["<b>Ask for feedback</b> politely. Not everyone replies, but some will.",
                   "<b>Write down</b> every question you were asked.",
                   "<b>Fix the gap:</b> revise that topic or practise that type of answer.",
                   "<b>Apply again later:</b> many companies let you reapply after a few months.",
                   "<b>Keep the momentum:</b> the next interview is already closer."]),
      ]),
      ("Got an offer? Next steps", "celebration", [
        ("list", ["Read the offer letter fully before accepting (see the HR Round guide).",
                  "Accept in writing by email, within the deadline.",
                  "Keep your documents ready for background verification.",
                  "Keep learning until your joining date: you'll start stronger.",
                  "If you decline, inform them politely. Never just stop replying."]),
      ]),
      ("Handling multiple offers", "compare_arrows", [
        ("dodont", (["Compare learning, role, team and growth, not only salary", "Be honest with HR about your timeline", "Decline the others politely once you decide"],
                    ["Accept several offers and skip joining (\"ghosting\")", "Lie about other offers to raise salary", "Decide in a panic: ask for a day to think"])),
      ]),
    ],
    plan=["Save the thank-you email template", "Set follow-up reminders for days 7 and 14", "Write down questions after every interview",
          "Make an offer-comparison sheet", "Prepare your verification documents folder"]),

  dict(slug="handling-competition", phase=3, title="Handling Competition", icon="emoji_events",
    short="Stand out among lakhs of freshers",
    kicker="Handling Competition",
    h1="Lakhs of freshers. Here's how you stand out.",
    sub="Yes, the competition is big. But most applicants look the same on paper. A little extra proof, focus and communication puts you far ahead.",
    chips=[("trending_up", "Be different"), ("construction", "Show proof"), ("center_focus_strong", "Go deep")],
    sections=[
      ("The truth about competition", "insights", [
        ("cards", [("groups", "Many apply, few prepare", "A large share of applicants send generic resumes and never practise interviews."),
                   ("content_copy", "Most resumes look the same", "Same course projects, same certificates. Different = memorable."),
                   ("verified", "Proof beats promises", "\"I built\" is stronger than \"I know\"."),
                   ("record_voice_over", "Communication is rare", "Clear speakers stand out fast, especially among freshers.")]),
      ]),
      ("Your unfair advantages", "bolt", [
        ("list", ["A focused skill in demand: cloud, data engineering, AI/ML, or full stack.",
                  "Real projects that solve real problems, ideally for real users.",
                  "Open-source contributions, even small documentation fixes.",
                  "Hackathon participation, even without winning.",
                  "An internship or freelance work, even unpaid or short.",
                  "Strong communication: practised answers and a clean LinkedIn."]),
      ]),
      ("Build a T-shaped profile", "account_tree", [
        ("steps", ["<b>Broad base (the top of the T):</b> programming basics, SQL, Git, communication.",
                   "<b>Deep skill (the stem):</b> pick one area, such as data engineering, and go deep.",
                   "<b>Proof:</b> 2–3 projects in that area that you can explain inside out."]),
        ("tip", ("lightbulb", "Recruiters remember \"the student who built a real-time data pipeline\", not \"the student who knows 12 languages\".", "")),
      ]),
      ("Myth vs fact", "psychology_alt", [
        ("myths", [("IIT and NIT students get all the jobs.", "Top colleges get more campus visits, but off-campus, your skills and tests decide."),
                   ("I need to learn every technology.", "Depth in one area plus solid basics beats shallow knowledge of everything."),
                   ("The market is too tough right now.", "Hiring goes up and down, but prepared candidates keep getting offers in every cycle.")]),
      ]),
      ("Compare with yourself", "self_improvement", [
        ("tip", ("format_quote", "Don't compare your chapter 1 with someone else's chapter 20. Be 1% better than yesterday. In 90 days, that's a different you.", "teal")),
      ]),
    ],
    plan=["Pick one deep skill area", "List 3 things that make your profile different", "Start one project that solves a real problem",
          "Make one open-source contribution", "Register for one hackathon"]),
]
# fmt: on

# ---------------------------------------------------------------- menu icons (lucide-style, matches the mega menu)
MENU_ITEMS = [
    ("interview-prep", "Interview Prep", "Interview Prep: rounds, top questions & a 30-day plan", '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
    ("resume-prep", "Resume Prep", "Resume Prep: an ATS-friendly 1-page resume for freshers", '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/>'),
    ("job-applications", "Job Applications", "Job Applications: apply smart, referrals & avoiding scams", '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'),
    ("cover-letters", "Cover Letters", "Cover Letters: a 3-paragraph formula & cold emails", '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
    ("before-interview", "Before Interview", "Before the Interview: countdown, research & setup", '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>'),
    ("during-interview", "During Interview", "During the Interview: strong start, think aloud & smart questions", '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>'),
    ("handling-competition", "Handling Competition", "Handling Competition: stand out among lakhs of freshers", '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>'),
    ("communication-skills", "Communication Skills", "Communication Skills: clear English, structure & practice", '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>'),
]
BRIEFCASE = '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
GRID = '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>'
ACCENT = "#fb923c"


def menu_category(prefix):
    """The Placement column for the Subjects mega menu, with links relative to the page."""
    svg = lambda p: f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">{p}</svg>'
    items = "".join(f'''
          <a href="{prefix}placement-assistance/{slug}.html" class="mega-category-item" title="{E(tip)}">
            <span class="mega-item-arrow">&gt;</span>
            <span class="mega-item-icon">{svg(p)}</span>
            <span class="mega-item-text">
              <span class="mega-item-name">{E(name)}</span>
            </span>
          </a>''' for slug, name, tip, p in MENU_ITEMS)
    return f'''        <!-- Category: Placement Assistance -->
        <div class="mega-category-col" style="--cat-accent:{ACCENT};">
          <div class="mega-category-header">
            <span class="mega-cat-badge" style="color:{ACCENT};">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">{BRIEFCASE}</svg>
              <span>Placement</span>
            </span>
            <span class="mega-cat-count">{len(TOPICS)} Guides</span>
          </div>
          <div class="mega-category-list">{items}
          <a href="{prefix}placement-assistance/index.html" class="mega-category-item" title="All placement guides for freshers">
            <span class="mega-item-arrow">&gt;</span>
            <span class="mega-item-icon">{svg(GRID)}</span>
            <span class="mega-item-text">
              <span class="mega-item-name">All {len(TOPICS)} Guides</span>
            </span>
          </a>
          </div>
        </div>
'''


def add_menu_to_all_pages():
    """Insert the Placement column into every page's Subjects menu (idempotent)."""
    changed = 0
    for f in ROOT.rglob("*.html"):
        rel = f.relative_to(ROOT)
        if rel.parts[0] in ("scratch", "node_modules") or f.name.startswith("__"):
            continue
        s = f.read_text(encoding="utf-8")
        if 'id="subjectsMegaMenu"' not in s or "<!-- Category: Placement Assistance -->" in s:
            continue
        m = re.search(r'\n[ \t]*</div>\s*<div class="mega-menu-footer">', s)
        if not m:
            print("  ! no menu footer in", rel)
            continue
        prefix = "../" * (len(rel.parts) - 1)
        s = s[:m.start()] + "\n" + menu_category(prefix).rstrip("\n") + s[m.start():]
        s = s.replace("<span>5 Core Domains</span> • <span>26 Specialized Tracks</span>",
                      f"<span>6 Domains</span> • <span>26 Tracks + {len(TOPICS)} Placement Guides</span>")
        f.write_text(s, encoding="utf-8")
        changed += 1
    print(f"menu: added Placement column to {changed} pages")


def page_header():
    """Root header, re-pointed one folder deeper, branded for this vertical."""
    idx = (ROOT / "index.html").read_text(encoding="utf-8")
    a = idx.index('  <header class="master-top-nav">')
    b = idx.index("</header>", a) + len("</header>")
    h = idx[a:b]
    h = re.sub(r'(href|src)="(?!https?:|mailto:|#|/|\.\./|data:)([^"]+)"', r'\1="../\2"', h)
    h = h.replace('<span class="master-brand-badge">MasterClass Academy</span>', '<span class="master-brand-badge">Placement Assistance</span>')
    home_end = h.index("</a>", h.index('title="Main Academy Portal"')) + len("</a>")
    pa_home = f'''
        <a href="index.html" class="master-nav-btn subject-home-btn" title="Placement Assistance Home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{BRIEFCASE}</svg>
          <span>Placement Home</span>
        </a>'''
    return h[:home_end] + pa_home + h[home_end:]


# ---------------------------------------------------------------- block renderers
def block(kind, data):
    if kind == "p":
        return f'<p class="pa-p">{E(data)}</p>'
    if kind == "list":
        return '<ul class="pa-list">' + "".join(f'<li><span class="msr">check_circle</span><span>{E(x)}</span></li>' for x in data) + "</ul>"
    if kind == "cards":
        return '<div class="pa-cards">' + "".join(f'<div class="pa-card"><span class="msr">{ic}</span><h3>{E(t)}</h3><p>{E(d)}</p></div>' for ic, t, d in data) + "</div>"
    if kind == "steps":  # trusted inline <b> markup
        return '<ol class="pa-steps">' + "".join(f"<li>{x}</li>" for x in data) + "</ol>"
    if kind == "dodont":
        do, dont = data
        li = lambda xs, ic: '<ul class="pa-list">' + "".join(f'<li><span class="msr">{ic}</span><span>{E(x)}</span></li>' for x in xs) + "</ul>"
        return (f'<div class="pa-dodont"><div class="pa-do"><h3><span class="msr">thumb_up</span>Do</h3>{li(do, "check_circle")}</div>'
                f'<div class="pa-dont"><h3><span class="msr">thumb_down</span>Don\'t</h3>{li(dont, "cancel")}</div></div>')
    if kind == "compare":
        weak, strong = data
        return (f'<div class="pa-compare"><div class="pa-weak"><b><span class="msr" style="font-size:16px;">close</span>Weak</b>{E(weak)}</div>'
                f'<span class="msr">arrow_forward</span><div class="pa-strong"><b><span class="msr" style="font-size:16px;">check</span>Strong</b>{E(strong)}</div></div>')
    if kind == "tip":  # trusted inline markup
        ic, text, tone = data
        return f'<div class="pa-tip {tone}"><span class="msr">{ic}</span><div>{text}</div></div>'
    if kind == "script":
        return '<div class="pa-script">' + "".join(
            f'<div class="pa-line {"you" if who == "You" else ""}"><span class="who">{E(who)}</span><span class="say">{E(say)}</span></div>' for who, say in data) + "</div>"
    if kind == "paper":
        return '<div class="pa-paper">' + "".join(
            (f'<span class="t">{E(t)}</span>' if t else "") + (f'<span class="m">{E(m)}</span>' if m else "") for t, m in data) + "</div>"
    if kind == "timeline":
        return '<div class="pa-timeline">' + "".join(f'<div class="pa-tl"><b>{E(w)}</b><span>{E(t)}</span></div>' for w, t in data) + "</div>"
    if kind == "myths":
        return '<div class="pa-myths">' + "".join(
            f'<div class="pa-myth" tabindex="0" role="button" aria-label="Myth: {E(m)} Tap to reveal the fact"><div class="pa-myth-in">'
            f'<div class="pa-myth-f"><b>MYTH</b><span>{E(m)}</span><small><span class="msr" style="font-size:15px;">touch_app</span>Tap to see the fact</small></div>'
            f'<div class="pa-myth-b"><b>FACT</b><span>{E(f)}</span></div></div></div>' for m, f in data) + "</div>"
    if kind == "qa":
        return '<div class="pa-qa">' + "".join(
            f'<details><summary><span class="msr">add_circle</span>{E(q)}</summary><div class="ans">{E(a)}</div></details>' for q, a in data) + "</div>"
    if kind == "table":
        head, rows = data
        return ('<div class="pa-table-wrap"><table class="pa-table"><thead><tr>' + "".join(f"<th>{E(h)}</th>" for h in head) + "</tr></thead><tbody>"
                + "".join("<tr>" + "".join(f"<td>{E(c)}</td>" for c in r) + "</tr>" for r in rows) + "</tbody></table></div>")
    raise ValueError(kind)


def slugify(t):
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")


def sidebar(current):
    out = ['<aside class="pa-side" aria-label="Placement guides"><div class="pa-side-title">Placement Guides</div>',
           f'<a class="pa-topic {"on" if current == "index" else ""}" href="index.html"><span class="msr">home</span>Overview</a>']
    for i, (name, _, _) in enumerate(PHASES):
        out.append(f'<div class="pa-phase">{i + 1}. {E(name)}</div>')
        for t in TOPICS:
            if t["phase"] == i:
                out.append(f'<a class="pa-topic {"on" if t["slug"] == current else ""}" href="{t["slug"]}.html"><span class="msr">{t["icon"]}</span>{E(t["title"])}</a>')
    out.append("</aside>")
    return "".join(out)


FOOTER = '''<footer class="pa-footer"><span>&copy; 2026 Venkata Bhattaram · TinitiateAI</span>
  <a href="https://www.linkedin.com/in/venkata-bhattaram/" target="_blank" rel="noopener noreferrer"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/></svg>LinkedIn</a></footer>'''


def shell(title, desc, header, body):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{E(title)} | Placement Assistance | TinitiateAI</title>
  <meta name="description" content="{E(desc)}">
  <link rel="icon" type="image/png" href="../favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,0..1,0&display=block">
  <link rel="stylesheet" href="../assets/css/master-global-layout.css">
  <link rel="stylesheet" href="assets/css/placement.css">
  <script src="../assets/js/master-global-nav.js" defer></script>
</head>
<body class="pa-theme">
{header}
{body}
{FOOTER}
<script src="assets/js/placement.js"></script>
</body>
</html>
'''


def topic_page(i, t, header):
    secs = [(slugify(name), name, icon, blocks) for name, icon, blocks in t["sections"]]
    secs_html = "".join(
        f'<section class="pa-section pa-reveal" id="{sid}"><div class="pa-section-head"><span class="pa-ico"><span class="msr">{icon}</span></span><h2>{E(name)}</h2></div>'
        + "".join(block(k, d) for k, d in blocks) + "</section>" for sid, name, icon, blocks in secs)
    plan = "".join(f'<label><input type="checkbox"><span class="box"><span class="msr">check</span></span><span>{E(x)}</span></label>' for x in t["plan"])
    plan_html = (f'<section class="pa-section pa-reveal" id="action-plan"><div class="pa-section-head"><span class="pa-ico"><span class="msr">task_alt</span></span>'
                 f'<h2>Your action plan</h2></div><div class="pa-plan-head"><span class="pa-p" style="margin:0;">Tick each step as you finish it. Your progress is saved in this browser.</span>'
                 f'<span class="pa-plan-score" data-score-for="{t["slug"]}"></span></div><div class="pa-bar"><div data-bar-for="{t["slug"]}"></div></div>'
                 f'<div class="pa-check" data-key="{t["slug"]}">{plan}</div>'
                 f'<div class="pa-celebrate" data-celebrate-for="{t["slug"]}"><span class="msr">celebration</span>Shabash! You finished this guide. On to the next one.</div></section>')
    prev_t = TOPICS[i - 1] if i > 0 else None
    next_t = TOPICS[i + 1] if i < len(TOPICS) - 1 else None
    pager = ('<nav class="pa-pager">'
             + (f'<a href="{prev_t["slug"]}.html"><small><span class="msr" style="font-size:16px;">arrow_back</span>Previous</small>{E(prev_t["title"])}</a>' if prev_t else '<a href="index.html"><small><span class="msr" style="font-size:16px;">arrow_back</span>Back to</small>All guides</a>')
             + (f'<a class="next" href="{next_t["slug"]}.html"><small>Next<span class="msr" style="font-size:16px;">arrow_forward</span></small>{E(next_t["title"])}</a>' if next_t else '<a class="next" href="../why-tinitiate.html"><small>Next<span class="msr" style="font-size:16px;">arrow_forward</span></small>Why TinitiateAI</a>')
             + "</nav>")
    toc = ('<aside class="pa-toc" aria-label="On this page"><div class="pa-toc-title">On this page</div>'
           + "".join(f'<a href="#{sid}">{E(name)}</a>' for sid, name, _, _ in secs) + '<a href="#action-plan">Your action plan</a></aside>')
    chips = "".join(f'<span><span class="msr">{ic}</span>{E(x)}</span>' for ic, x in t["chips"])
    hero = (f'<header class="pa-hero"><span class="pa-hero-icon" aria-hidden="true"><span class="msr">{t["icon"]}</span></span>'
            f'<span class="pa-kicker"><span class="msr" style="font-size:15px;">{PHASES[t["phase"]][2]}</span>Step {t["phase"] + 1} · {E(PHASES[t["phase"]][0])} · {E(t["kicker"])}</span>'
            f'<h1>{E(t["h1"])}</h1><p>{E(t["sub"])}</p><div class="pa-chips">{chips}</div></header>')
    body = f'<div class="pa-shell">{sidebar(t["slug"])}<main>{hero}{secs_html}{plan_html}{pager}</main>{toc}</div>'
    return shell(t["title"], t["sub"], header, body)


def hub_page(header):
    readiness = [
        ("My resume is 1 page, with projects and numbers.", "resume-prep"),
        ("My LinkedIn has a photo, a strong headline and featured projects.", "linkedin-naukri"),
        ("I have at least 2 projects on GitHub with READMEs.", "off-campus-jobs"),
        ("I practise aptitude or coding at least 5 days a week.", "aptitude-coding"),
        ("I can introduce myself confidently in 60–90 seconds.", "during-interview"),
        ("I can explain my best project using STAR.", "interview-prep"),
        ("I apply to jobs every week and track them in a sheet.", "job-applications"),
        ("I know the difference between CTC and in-hand salary.", "hr-round-salary"),
        ("I've done at least one mock interview.", "interview-prep"),
        ("After a rejection, I know exactly what to do next.", "after-interview"),
    ]
    quiz = "".join(f'<label><span>{E(q)} <a href="{s}.html" style="color:var(--pa-saffron-d);font-weight:700;font-size:13px;white-space:nowrap;">Guide&nbsp;→</a></span>'
                   f'<span class="pa-yn"><button type="button" class="yes" data-v="y">Yes</button><button type="button" class="no" data-v="n">No</button></span></label>'
                   for q, s in readiness)
    cols = ""
    for i, (name, sub, ic) in enumerate(PHASES):
        tiles = "".join(f'<a class="pa-tile" href="{t["slug"]}.html"><span class="ic"><span class="msr">{t["icon"]}</span></span><span><b>{E(t["title"])}</b><small>{E(t["short"])}</small></span></a>'
                        for t in TOPICS if t["phase"] == i)
        cols += f'<div class="pa-phase-col pa-reveal"><h3><span class="n">{i + 1}</span>{E(name)}</h3><p>{E(sub)}</p>{tiles}</div>'
    overall = ",".join(f'{t["slug"]}:{len(t["plan"])}' for t in TOPICS)
    hero = ('<header class="pa-hero pa-hub-hero"><span class="pa-hero-icon" aria-hidden="true"><span class="msr">work</span></span>'
            '<span class="pa-kicker"><span class="msr" style="font-size:15px;">school</span>Placement Assistance · For every fresher</span>'
            '<h1>Tier-2 or tier-3 college? Your skills decide your package, not your college name.</h1>'
            f'<p>{len(TOPICS)} step-by-step guides that take you from resume to offer letter: written simply, made for Indian freshers, and full of examples you can copy today.</p>'
            '<div class="pa-hub-cta"><a class="pa-btn light" href="#readiness"><span class="msr">speed</span>Check my readiness</a>'
            '<a class="pa-btn ghost" href="resume-prep.html"><span class="msr">play_arrow</span>Start with Resume Prep</a></div>'
            '<div class="pa-chips"><span><span class="msr">translate</span>Simple English</span><span><span class="msr">flag</span>Made for India</span><span><span class="msr">task_alt</span>Action plan in every guide</span></div></header>')
    promise = ('<section class="pa-section pa-reveal" id="promise"><div class="pa-section-head"><span class="pa-ico"><span class="msr">favorite</span></span><h2>Why this works for you</h2></div>'
               '<div class="pa-promise"><div><div class="big">No jargon</div><p>Simple, friendly English with real examples from Indian freshers.</p></div>'
               '<div><div class="big">Copy &amp; use</div><p>Resume lines, emails, scripts and templates you can use today.</p></div>'
               '<div><div class="big">Step by step</div><p>Four clear phases, from getting ready to winning the offer.</p></div>'
               '<div><div class="big">Track it</div><p>Every guide ends with an action plan that saves your progress.</p></div></div></section>')
    ready = ('<section class="pa-section pa-reveal" id="readiness"><div class="pa-section-head"><span class="pa-ico"><span class="msr">speed</span></span><h2>Placement readiness check</h2></div>'
             '<p class="pa-p">Answer honestly. There are no wrong answers, only a clearer plan. Your answers are saved in this browser.</p>'
             f'<div class="pa-score"><div class="pa-ring" id="paRing"><span>0%</span></div><div><b style="font-size:18px;color:var(--pa-ink);">Your readiness score</b><p id="paScoreMsg"></p></div></div>'
             f'<div class="pa-quiz" id="paQuiz">{quiz}</div></section>')
    roadmap = f'<section class="pa-section pa-reveal" id="roadmap"><div class="pa-section-head"><span class="pa-ico"><span class="msr">route</span></span><h2>Your roadmap: resume to offer letter</h2></div><div class="pa-phase-grid">{cols}</div></section>'
    progress = (f'<section class="pa-section pa-reveal" id="progress"><div class="pa-section-head"><span class="pa-ico"><span class="msr">insights</span></span><h2>Your progress</h2></div>'
                f'<div class="pa-progress-card" data-overall="{overall}" style="margin:0;font-size:15px;">Action-plan steps completed: <b></b><div class="pa-bar"><div></div></div></div>'
                '<div class="pa-tip teal" style="margin-top:14px;"><span class="msr">format_quote</span><div>Placement is a marathon, not a sprint. One guide a day, one action plan at a time, and you will be interview-ready faster than you think.</div></div></section>')
    toc = ('<aside class="pa-toc" aria-label="On this page"><div class="pa-toc-title">On this page</div>'
           '<a href="#promise">Why this works</a><a href="#readiness">Readiness check</a><a href="#roadmap">Roadmap</a><a href="#progress">Your progress</a></aside>')
    body = f'<div class="pa-shell">{sidebar("index")}<main>{hero}{promise}{ready}{roadmap}{progress}</main>{toc}</div>'
    return shell("Resume to Offer Letter", "Step-by-step placement guides for Indian freshers: resume, applications, interviews, salary and more.", header, body)


def main():
    add_menu_to_all_pages()          # root index.html first, so the copied header includes the new column
    header = page_header()
    OUT.mkdir(exist_ok=True)
    (OUT / "index.html").write_text(hub_page(header), encoding="utf-8")
    for i, t in enumerate(TOPICS):
        (OUT / f'{t["slug"]}.html').write_text(topic_page(i, t, header), encoding="utf-8")
    print(f"pages: wrote index.html + {len(TOPICS)} topic pages to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
