import Container from "components/shared/Container";
import { FooterPageContent } from "data/footerPages";

type InfoPageProps = {
  content: FooterPageContent;
};

export default function InfoPage({ content }: InfoPageProps) {
  return (
    <main className="bg-[#fffaf6] py-10 sm:py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <section className="overflow-hidden rounded-[28px] border border-[#fed7aa] bg-white shadow-[0_18px_60px_rgba(249,115,22,0.08)]">
            <div className="border-b border-[#ffedd5] bg-[linear-gradient(135deg,#fff1e8,white)] px-6 py-8 sm:px-8 sm:py-10">
              <p className="mb-3 inline-flex rounded-full bg-[#fff1e8] px-4 py-1 text-sm font-semibold tracking-[0.18em] text-primary">
                {content.badge}
              </p>
              <h1 className="max-w-3xl text-3xl font-bold leading-tight text-[#7c2d12] sm:text-4xl">
                {content.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#9a3412] sm:text-[17px]">
                {content.intro}
              </p>
            </div>

            <div className="px-6 py-8 sm:px-8">
              <div className="space-y-8">
                {content.sections.map((section) => (
                  <article
                    key={section.title}
                    className="rounded-[24px] border border-[#ffedd5] bg-[#fffaf6] p-5 sm:p-6"
                  >
                    <h2 className="mb-4 text-2xl font-semibold text-[#7c2d12]">
                      {section.title}
                    </h2>

                    <div className="space-y-4 text-[16px] leading-8 text-[#9a3412]">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {section.bullets && (
                      <ul className="mt-5 space-y-3 text-[16px] leading-7 text-[#7c2d12]">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-[26px] border border-[#fed7aa] bg-[#fff1e8] p-6">
              <h2 className="text-xl font-semibold text-[#7c2d12]">
                গুরুত্বপূর্ণ বিষয়
              </h2>
              <div className="mt-4 space-y-3">
                {content.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white px-4 py-3 text-[15px] leading-7 text-[#9a3412] shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-[#fed7aa] bg-white p-6 shadow-[0_14px_40px_rgba(124,45,18,0.06)]">
              <h2 className="text-xl font-semibold text-[#7c2d12]">
                সহায়তা প্রয়োজন?
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-[#9a3412]">
                অর্ডার, ডেলিভারি, নীতি বা সাধারণ জিজ্ঞাসার বিষয়ে আমাদের সাথে
                সরাসরি যোগাযোগ করতে পারেন।
              </p>

              <div className="mt-5 space-y-3 text-[15px] text-[#7c2d12]">
                <a
                  href="tel:+8801779024048"
                  className="block rounded-2xl bg-[#fff7f1] px-4 py-3 font-semibold transition-colors hover:text-primary"
                >
                  ফোন: +৮৮০১৭৭৯০২৪০৪৮
                </a>
                <a
                  href="mailto:sajolibn@gmail.com"
                  className="block rounded-2xl bg-[#fff7f1] px-4 py-3 font-semibold transition-colors hover:text-primary"
                >
                  ইমেইল: sajolibn@gmail.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
