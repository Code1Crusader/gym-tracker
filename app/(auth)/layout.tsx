export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className='w-full max-w-md h-full'>{children}</div>;
}
