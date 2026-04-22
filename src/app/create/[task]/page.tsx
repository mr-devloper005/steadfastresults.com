"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Lock,
  Save,
  Sparkles,
  Upload,
} from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
  hint?: string;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Write an Article",
    description: "Publish a long-form article to your reading platform.",
    fields: [
      {
        key: "title",
        label: "Article title",
        type: "text",
        required: true,
        placeholder: "A clear, descriptive headline",
        hint: "Aim for 6 to 12 words. Strong titles set the tone for the whole piece.",
      },
      {
        key: "summary",
        label: "Short summary",
        type: "textarea",
        required: true,
        placeholder: "One or two sentences that introduce the story.",
        hint: "Shows up in feeds, previews, and search results.",
      },
      {
        key: "description",
        label: "Article content",
        type: "textarea",
        required: true,
        placeholder: "Write the full article here. HTML is allowed for formatting.",
        hint: "Long-form welcome. Break thoughts with paragraphs and subheadings.",
      },
      {
        key: "category",
        label: "Category",
        type: "category",
        required: true,
        hint: "Helps readers discover your article in the right section.",
      },
      {
        key: "images",
        label: "Cover images",
        type: "images",
        placeholder: "https://image-1.jpg, https://image-2.jpg",
        hint: "Paste image URLs separated by commas. The first one is used as the cover.",
      },
      {
        key: "tags",
        label: "Tags",
        type: "tags",
        placeholder: "strategy, analysis, business",
        hint: "Up to 5 short tags work best.",
      },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it's useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

const inputBase =
  "w-full rounded-xl border border-white/10 bg-[#0b0b10] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#d6c5f0]/50 focus:outline-none";

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  if (!taskConfig || !formConfig) {
    return (
      <div className="min-h-screen bg-[#0b0b10] text-white">
        <NavbarShell />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Task not available</h1>
          <p className="mt-3 text-sm text-slate-400">
            This task is not enabled for the current site.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d6c5f0] px-6 py-3 text-sm font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const requiredFields = formConfig.fields.filter((f) => f.required);
  const completedRequired = requiredFields.filter((f) => values[f.key]).length;
  const progressPct = requiredFields.length
    ? Math.round((completedRequired / requiredFields.length) * 100)
    : 100;

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const tips =
    taskKey === "article"
      ? [
          "Open with a clear premise — readers commit fast.",
          "Break long sections with subheadings and short paragraphs.",
          "Add a strong cover image to lift the article in feeds.",
          "Tag thoughtfully so the right readers find it.",
        ]
      : [
          "Fill the required fields first to unlock saving.",
          "Use a clean cover image for stronger visual presence.",
          "Concise summaries perform better in feeds and previews.",
        ];

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
              {taskConfig.label}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
              <Lock className="h-3 w-3" />
              Saved locally
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            {formConfig.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
            {formConfig.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="rounded-2xl bg-[#15151c] p-8 sm:p-10">
            <div className="flex items-center justify-between gap-6">
              <div>
                <h2 className="text-lg font-semibold">Story details</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Fields marked with <span className="text-[#d6c5f0]">*</span> are required.
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Required
                </div>
                <div className="mt-1 text-sm font-semibold text-[#d6c5f0]">
                  {completedRequired} / {requiredFields.length}
                </div>
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#d6c5f0] to-[#9b7fcf] transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="mt-8 grid gap-6">
              {formConfig.fields.map((field) => (
                <div key={field.key} className="grid gap-2">
                  <label className="text-sm font-medium text-slate-200">
                    {field.label}{" "}
                    {field.required ? <span className="text-[#d6c5f0]">*</span> : null}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      rows={field.key === "description" ? 8 : 4}
                      placeholder={field.placeholder}
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className={`${inputBase} py-3 leading-7`}
                    />
                  ) : field.type === "category" ? (
                    <select
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className={`${inputBase} h-12`}
                    >
                      <option value="" className="bg-[#0b0b10]">
                        Select category
                      </option>
                      {CATEGORY_OPTIONS.map((option) => (
                        <option key={option.slug} value={option.slug} className="bg-[#0b0b10]">
                          {option.name}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <div className="grid gap-3">
                      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed border-white/15 bg-[#0b0b10] px-4 py-4 text-sm text-slate-300 hover:border-[#d6c5f0]/40 hover:bg-white/5">
                        <span className="flex items-center gap-3">
                          <Upload className="h-4 w-4 text-[#d6c5f0]" />
                          {uploadingPdf ? "Uploading PDF..." : "Click to upload a PDF file"}
                        </span>
                        <span className="rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-semibold text-[#d6c5f0]">
                          PDF
                        </span>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (!file) return;
                            if (file.type !== "application/pdf") {
                              toast({
                                title: "Invalid file",
                                description: "Please upload a PDF file.",
                              });
                              return;
                            }
                            const reader = new FileReader();
                            setUploadingPdf(true);
                            reader.onload = () => {
                              const result =
                                typeof reader.result === "string" ? reader.result : "";
                              updateValue(field.key, result);
                              setUploadingPdf(false);
                              toast({
                                title: "PDF uploaded",
                                description: "File is stored locally.",
                              });
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or paste a PDF URL"
                        value={values[field.key] || ""}
                        onChange={(event) => updateValue(field.key, event.target.value)}
                        className={`${inputBase} h-12`}
                      />
                    </div>
                  ) : (
                    <input
                      type={field.type === "number" ? "number" : "text"}
                      placeholder={
                        field.type === "images" ||
                        field.type === "tags" ||
                        field.type === "highlights"
                          ? field.placeholder || "Separate values with commas"
                          : field.placeholder
                      }
                      value={values[field.key] || ""}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                      className={`${inputBase} h-12`}
                    />
                  )}

                  {field.hint && (
                    <p className="text-xs text-slate-500">{field.hint}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
              <p className="text-xs text-slate-500">
                Your draft is saved only in this browser.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={taskConfig.route}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 rounded-full bg-[#d6c5f0] px-6 py-2.5 text-sm font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
                >
                  <Save className="h-4 w-4" />
                  Publish locally
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <aside className="grid gap-6 lg:sticky lg:top-24">
            <div className="rounded-2xl bg-gradient-to-br from-[#3d2566] to-[#5b3b8e] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-[#d6c5f0]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">Writing tips</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d6c5f0]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#15151c] p-6">
              <h3 className="text-sm font-semibold text-white">Live preview</h3>
              <p className="mt-1 text-xs text-slate-500">How your post will appear in feeds.</p>
              <div className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-[#0b0b10]">
                {values.images?.split(",")[0]?.trim() ? (
                  <img
                    src={values.images.split(",")[0].trim()}
                    alt="cover preview"
                    className="h-32 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-32 w-full items-center justify-center bg-gradient-to-br from-[#3d2566]/40 to-[#5b3b8e]/40 text-slate-500">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
                <div className="p-4">
                  {values.category && (
                    <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-[#d6c5f0]">
                      {values.category}
                    </span>
                  )}
                  <p className="mt-2 line-clamp-2 text-sm font-semibold text-white">
                    {values.title || values.brandName || "Your title appears here"}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                    {values.summary || "Your short summary will preview here."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#15151c] p-6">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 text-[#d6c5f0]" />
                <div>
                  <h4 className="text-sm font-semibold">Stored in your browser</h4>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Local posts live only in this device&apos;s storage. Clearing your browser data
                    will remove them.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
