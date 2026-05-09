import Container from "components/shared/Container";

export default function MangoCategoryIntro() {
  return (
    <section className="bg-[#fffaf6] pt-10 sm:pt-14">
      <Container>
        <div className="rounded-[30px] border border-[#fed7aa] bg-white p-6 shadow-[0_20px_60px_rgba(249,115,22,0.08)] sm:p-8">
          <span className="inline-flex rounded-full bg-[#fff1e8] px-4 py-2 text-sm font-semibold tracking-[0.18em] text-primary">
            আম ক্যাটাগরি
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#7c2d12] sm:text-4xl">
            সাতক্ষীরার জনপ্রিয় আমের বাছাইকৃত সংগ্রহ
          </h1>
          <p className="mt-5 max-w-4xl text-[16px] leading-8 text-[#9a3412] sm:text-[17px]">
            এই পেইজে আমরা এমন সব আম একসাথে সাজিয়েছি যেগুলো গ্রাহকের রিপিট
            অর্ডার, স্বাদের প্রশংসা এবং পারিবারিক ব্যবহারের অভিজ্ঞতা থেকে সবচেয়ে
            বেশি জনপ্রিয় হয়েছে। গাছপাকা স্বাদ, মিষ্টতা, শাঁসের পরিমাণ, সুবাস এবং
            ব্যবহারিক দিক বিবেচনা করে আমরা প্রতিটি ভ্যারাইটি নির্বাচন করেছি।
          </p>
          <p className="mt-4 max-w-4xl text-[16px] leading-8 text-[#9a3412] sm:text-[17px]">
            আপনি যদি প্রথমবার অর্ডার করতে চান, তাহলে এখান থেকেই শুরু করতে পারেন।
            আর যদি নির্দিষ্ট জাতের আম খুঁজে থাকেন, তাহলেও এই সেকশন আপনাকে দ্রুত
            সিদ্ধান্ত নিতে সাহায্য করবে।
          </p>
        </div>
      </Container>
    </section>
  );
}
