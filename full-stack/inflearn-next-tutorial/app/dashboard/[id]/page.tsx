export default function DashboardDetailPage({params, searchParams}) {
    console.log(params)
  return (
    <main>DashboardDetailPage {params.id} code={searchParams.code}</main>
  );
} 