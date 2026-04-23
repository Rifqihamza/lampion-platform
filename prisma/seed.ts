import { prisma } from "../src/lib/prisma"; // Sesuaikan path ke lib/prisma kamu

async function main() {
    console.log("🏮 Start seeding Lampion data...");

    // 1. Bersihkan Data Lama (Optional, tapi disarankan agar tidak duplikat slug)
    // Urutan delete penting untuk menghindari FK Constraint error
    await prisma.milestone.deleteMany({});
    await prisma.roadmap.deleteMany({});
    await prisma.category.deleteMany({});

    // 2. Create Categories
    const catWeb = await prisma.category.create({
        data: { name: "Modern Web Development", slug: "web-dev" },
    });
    const catPhoto = await prisma.category.create({
        data: { name: "Cinematic Photography", slug: "cinematic" },
    });
    const catBiz = await prisma.category.create({
        data: { name: "Strategic Business", slug: "business" },
    });

    // 3. Create Roadmap: Web Dev (Next.js Focus)
    await prisma.roadmap.create({
        data: {
            title: "Next.js 15 Fullstack Mastery",
            slug: "nextjs-mastery",
            description: "Belajar membangun aplikasi scalable dengan App Router dan Server Actions.",
            difficulty: "INTERMEDIATE",
            duration: "8 Weeks",
            categoryId: catWeb.id,
            milestones: {
                create: [
                    {
                        title: "Next.js Fundamentals",
                        description: "Routing, Layouts, dan Server Components.",
                        order: 1,
                        type: "VIDEO",
                        contentUrl: "https://nextjs.org/docs",
                    },
                    {
                        title: "Database Integration with Prisma",
                        description: "Menghubungkan MariaDB/Postgres ke aplikasi.",
                        order: 2,
                        type: "ARTICLE",
                        contentUrl: "#",
                    },
                ],
            },
        },
    });

    // 4. Create Roadmap: Photography
    await prisma.roadmap.create({
        data: {
            title: "Cinematic Lighting Guide",
            slug: "cinematic-lighting",
            description: "Seni menggunakan bayangan dan cahaya untuk mood filmis.",
            difficulty: "BEGINNER",
            duration: "4 Weeks",
            categoryId: catPhoto.id,
            milestones: {
                create: [
                    {
                        title: "The Three Point Lighting",
                        description: "Key light, Fill light, dan Back light.",
                        order: 1,
                        type: "VIDEO",
                        contentUrl: "#",
                    },
                    {
                        title: "Color Grading Basics",
                        description: "Menggunakan LUTs untuk hasil sinematik.",
                        order: 2,
                        type: "ARTICLE",
                        contentUrl: "#",
                    },
                ],
            },
        },
    });

    const catData = await prisma.category.create({
        data: { name: "Data Science & AI", slug: "data-science" },
    });

    await prisma.roadmap.create({
        data: {
            title: "Python for Data Science",
            slug: "python-data-science",
            description: "Dasar Python untuk analisis data dan machine learning.",
            difficulty: "BEGINNER",
            duration: "6 Weeks",
            categoryId: catData.id,
            milestones: {
                create: [
                    {
                        title: "Python Basics",
                        description: "Syntax, control flow, dan data structures.",
                        order: 1,
                        type: "VIDEO",
                        contentUrl: "https://docs.python.org/3/tutorial/",
                    },
                    {
                        title: "Data Analysis with Pandas",
                        description: "Manipulasi data tabular dengan Pandas.",
                        order: 2,
                        type: "ARTICLE",
                        contentUrl: "#",
                    },
                    {
                        title: "Intro to Machine Learning",
                        description: "Konsep supervised vs unsupervised learning.",
                        order: 3,
                        type: "VIDEO",
                        contentUrl: "#",
                    },
                ],
            },
        },
    });

    // 6. Create Roadmap: Mobile Development
    const catMobile = await prisma.category.create({
        data: { name: "Mobile Development", slug: "mobile-dev" },
    });

    await prisma.roadmap.create({
        data: {
            title: "React Native Essentials",
            slug: "react-native-essentials",
            description: "Membangun aplikasi cross-platform dengan React Native dan Expo.",
            difficulty: "INTERMEDIATE",
            duration: "5 Weeks",
            categoryId: catMobile.id,
            milestones: {
                create: [
                    {
                        title: "React Native Basics",
                        description: "Komponen, props, dan state.",
                        order: 1,
                        type: "VIDEO",
                        contentUrl: "https://reactnative.dev/docs/getting-started",
                    },
                    {
                        title: "Navigation",
                        description: "Menggunakan React Navigation untuk multi-screen apps.",
                        order: 2,
                        type: "ARTICLE",
                        contentUrl: "#",
                    },
                    {
                        title: "Expo SDK",
                        description: "Integrasi kamera, notifikasi, dan sensor.",
                        order: 3,
                        type: "VIDEO",
                        contentUrl: "#",
                    },
                ],
            },
        },
    });

    // 7. Create Roadmap: UI/UX Design
    const catDesign = await prisma.category.create({
        data: { name: "UI/UX Design", slug: "ui-ux" },
    });

    await prisma.roadmap.create({
        data: {
            title: "Design Thinking Fundamentals",
            slug: "design-thinking",
            description: "Pendekatan kreatif untuk problem solving dalam desain produk.",
            difficulty: "BEGINNER",
            duration: "3 Weeks",
            categoryId: catDesign.id,
            milestones: {
                create: [
                    {
                        title: "Empathize & Define",
                        description: "Memahami user dan mendefinisikan masalah.",
                        order: 1,
                        type: "ARTICLE",
                        contentUrl: "#",
                    },
                    {
                        title: "Ideate & Prototype",
                        description: "Brainstorming solusi dan membuat prototipe.",
                        order: 2,
                        type: "VIDEO",
                        contentUrl: "#",
                    },
                    {
                        title: "Test & Iterate",
                        description: "Uji coba prototipe dan perbaikan berulang.",
                        order: 3,
                        type: "ARTICLE",
                        contentUrl: "#",
                    },
                ],
            },
        },
    });

    // 8. Create Roadmap: Cybersecurity
    const catCyber = await prisma.category.create({
        data: { name: "Cybersecurity", slug: "cybersecurity" },
    });

    await prisma.roadmap.create({
        data: {
            title: "Fundamentals of Cybersecurity",
            slug: "cybersecurity-fundamentals",
            description: "Belajar dasar keamanan jaringan dan aplikasi.",
            difficulty: "BEGINNER",
            duration: "6 Weeks",
            categoryId: catCyber.id,
            milestones: {
                create: [
                    {
                        title: "Network Security Basics",
                        description: "Firewall, VPN, dan IDS.",
                        order: 1,
                        type: "VIDEO",
                        contentUrl: "#",
                    },
                    {
                        title: "Web Application Security",
                        description: "SQL Injection, XSS, dan CSRF.",
                        order: 2,
                        type: "ARTICLE",
                        contentUrl: "#",
                    },
                    {
                        title: "Best Practices",
                        description: "Password policy, enkripsi, dan patching.",
                        order: 3,
                        type: "VIDEO",
                        contentUrl: "#",
                    },
                ],
            },
        },
    });

    // 9. Create Roadmap: Cloud Computing
    const catCloud = await prisma.category.create({
        data: { name: "Cloud Computing", slug: "cloud" },
    });

    await prisma.roadmap.create({
        data: {
            title: "AWS Cloud Practitioner",
            slug: "aws-practitioner",
            description: "Dasar-dasar AWS untuk pemula.",
            difficulty: "BEGINNER",
            duration: "4 Weeks",
            categoryId: catCloud.id,
            milestones: {
                create: [
                    { title: "Intro AWS", description: "Layanan utama AWS.", order: 1, type: "VIDEO", contentUrl: "#" },
                    { title: "IAM Basics", description: "Identity & Access Management.", order: 2, type: "ARTICLE", contentUrl: "#" },
                ],
            },
        },
    });

    await prisma.roadmap.create({
        data: {
            title: "Kubernetes Orchestration",
            slug: "kubernetes-orchestration",
            description: "Mengelola container dengan Kubernetes.",
            difficulty: "INTERMEDIATE",
            duration: "6 Weeks",
            categoryId: catCloud.id,
            milestones: {
                create: [
                    { title: "Pods & Services", description: "Dasar Kubernetes.", order: 1, type: "VIDEO", contentUrl: "#" },
                    { title: "Deployments", description: "Strategi deployment.", order: 2, type: "ARTICLE", contentUrl: "#" },
                ],
            },
        },
    });

    // 10. Create Roadmap: DevOps
    const catDevOps = await prisma.category.create({
        data: { name: "DevOps", slug: "devops" },
    });

    await prisma.roadmap.create({
        data: {
            title: "CI/CD with GitHub Actions",
            slug: "ci-cd-github",
            description: "Automasi pipeline dengan GitHub Actions.",
            difficulty: "INTERMEDIATE",
            duration: "5 Weeks",
            categoryId: catDevOps.id,
            milestones: {
                create: [
                    { title: "Intro CI/CD", description: "Konsep dasar.", order: 1, type: "ARTICLE", contentUrl: "#" },
                    { title: "GitHub Actions Basics", description: "Workflow YAML.", order: 2, type: "VIDEO", contentUrl: "#" },
                ],
            },
        },
    });

    await prisma.roadmap.create({
        data: {
            title: "Docker Mastery",
            slug: "docker-mastery",
            description: "Belajar containerization dengan Docker.",
            difficulty: "BEGINNER",
            duration: "4 Weeks",
            categoryId: catDevOps.id,
            milestones: {
                create: [
                    { title: "Docker Basics", description: "Image & Container.", order: 1, type: "VIDEO", contentUrl: "#" },
                    { title: "Docker Compose", description: "Multi-container apps.", order: 2, type: "ARTICLE", contentUrl: "#" },
                ],
            },
        },
    });

    // 11. Create Roadmap: Game Development
    const catGame = await prisma.category.create({
        data: { name: "Game Development", slug: "game-dev" },
    });

    await prisma.roadmap.create({
        data: {
            title: "Unity 3D Basics",
            slug: "unity-basics",
            description: "Membangun game 3D dengan Unity.",
            difficulty: "BEGINNER",
            duration: "6 Weeks",
            categoryId: catGame.id,
            milestones: {
                create: [
                    { title: "Unity Editor", description: "Navigasi editor.", order: 1, type: "VIDEO", contentUrl: "#" },
                    { title: "Physics & Colliders", description: "Dasar fisika game.", order: 2, type: "ARTICLE", contentUrl: "#" },
                ],
            },
        },
    });

    await prisma.roadmap.create({
        data: {
            title: "Unreal Engine Advanced",
            slug: "unreal-advanced",
            description: "Game development dengan Unreal Engine.",
            difficulty: "ADVANCED",
            duration: "8 Weeks",
            categoryId: catGame.id,
            milestones: {
                create: [
                    { title: "Blueprints", description: "Visual scripting.", order: 1, type: "VIDEO", contentUrl: "#" },
                    { title: "C++ Integration", description: "Custom logic.", order: 2, type: "ARTICLE", contentUrl: "#" },
                ],
            },
        },
    });

    // 12. Create Roadmap: Blockchain
    const catBlockchain = await prisma.category.create({
        data: { name: "Blockchain", slug: "blockchain" },
    });

    await prisma.roadmap.create({
        data: {
            title: "Ethereum Smart Contracts",
            slug: "ethereum-smart-contracts",
            description: "Belajar Solidity untuk smart contract.",
            difficulty: "INTERMEDIATE",
            duration: "5 Weeks",
            categoryId: catBlockchain.id,
            milestones: {
                create: [
                    { title: "Solidity Basics", description: "Syntax & struktur.", order: 1, type: "VIDEO", contentUrl: "#" },
                    { title: "Deploy Contracts", description: "Menggunakan Remix.", order: 2, type: "ARTICLE", contentUrl: "#" },
                ],
            },
        },
    });

    await prisma.roadmap.create({
        data: {
            title: "Web3 dApp Development",
            slug: "web3-dapp",
            description: "Membangun aplikasi terdesentralisasi.",
            difficulty: "ADVANCED",
            duration: "7 Weeks",
            categoryId: catBlockchain.id,
            milestones: {
                create: [
                    { title: "Wallet Integration", description: "Metamask & Web3.js.", order: 1, type: "VIDEO", contentUrl: "#" },
                    { title: "Smart Contract Interaction", description: "Call & transact.", order: 2, type: "ARTICLE", contentUrl: "#" },
                ],
            },
        },
    });

    console.log("✅ Seed finished: Lampion is now enlightened!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
