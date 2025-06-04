import { User } from "next-auth"; // ✅ Import User type

...

async authorize(credentials): Promise<User | null> {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Invalid credentials");
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    return null;
  }

  // ✅ Return object must match the `User` type
  return {
    id: user.id,
    email: user.email,
    name: user.name ?? null, // Optional
    image: null,             // Optional
  };
}
