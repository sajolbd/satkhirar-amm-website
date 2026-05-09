import Container from "components/shared/Container";
import { ComingSoonPageContent } from "data/comingSoonPages";

type ComingSoonPageProps = {
  content: ComingSoonPageContent;
};

export default function ComingSoonPage({ content }: ComingSoonPageProps) {
  return (
    <main className="bg-[#fffaf6] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <section className="rounded-[30px] border border-[#fed7aa] bg-white p-6 shadow-[0_22px_70px_rgba(249,115,22,0.08)] sm:p-8">
            <span className="inline-flex rounded-full bg-[#fff1e8] px-4 py-2 text-sm font-semibold tracking-[0.18em] text-primary">
              {content.badge}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-[#7c2d12] sm:text-4xl">
              {content.title}
            </h1>
            <p className="mt-5 text-[16px] leading-8 text-[#9a3412] sm:text-[17px]">
              {content.description}
            </p>

            <div className="mt-8 rounded-[24px] border border-[#ffddb8] bg-[#fff7f1] p-5">
              <h2 className="text-xl font-semibold text-[#7c2d12]">
                আমরা কী প্রস্তুত করছি
              </h2>
              <div className="mt-4 space-y-3">
                {content.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white px-4 py-3 text-[15px] leading-7 text-[#9a3412]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-[30px] border border-[#fed7aa] bg-[linear-gradient(135deg,#fff1e8,#fff9f4)] p-6 shadow-[0_18px_50px_rgba(124,45,18,0.06)] sm:p-8">
            <div className="rounded-[24px] border border-white/70 bg-white/85 p-6">
              <p className="text-sm font-semibold tracking-[0.18em] text-primary">
                আপডেট পেতে যুক্ত থাকুন
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-[#7c2d12]">
                এই ক্যাটাগরিটি খুব শীঘ্রই চালু হবে
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#9a3412]">
                আমরা চাই প্রতিটি নতুন ক্যাটাগরি একই আস্থা, মান এবং পরিচ্ছন্ন
                উপস্থাপনা নিয়ে আপনার সামনে আসুক। তাই তাড়াহুড়া না করে সুন্দরভাবে
                প্রস্তুত করেই পেইজগুলো প্রকাশ করছি।
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
