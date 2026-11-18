import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import { site, devtoUrl } from "../config/site";

type Article = {
  id: number;
  title: string;
  description: string;
  url: string;
  readable_publish_date: string;
  reading_time_minutes: number;
  tag_list?: string[] | string;
};

type State =
  | { kind: "loading" }
  | { kind: "ready"; articles: Article[] }
  | { kind: "error" };

const toTags = (tags: Article["tag_list"]): string[] =>
  Array.isArray(tags) ? tags : [];

// Renders nothing until a dev.to username is set in config/site.ts.
const Writing: React.FC = () => {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!site.devtoUsername) return;
    const controller = new AbortController();

    fetch(
      `https://dev.to/api/articles?username=${encodeURIComponent(
        site.devtoUsername,
      )}&per_page=6`,
      { signal: controller.signal },
    )
      .then((res) => {
        if (!res.ok) throw new Error(`dev.to responded with ${res.status}`);
        return res.json() as Promise<Article[]>;
      })
      .then((articles) => setState({ kind: "ready", articles }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({ kind: "error" });
      });

    return () => controller.abort();
  }, []);

  if (!site.devtoUsername) return null;

  return (
    <Section id="writing" eyebrow="Writing" title="Latest from the blog">
      {state.kind === "loading" && (
        <p className="text-silver-muted" role="status">
          Loading posts
        </p>
      )}

      {state.kind === "error" && (
        <p className="text-silver">
          The latest posts could not be loaded right now. You can read
          everything on{" "}
          <a
            href={devtoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-vibranium-glow hover:text-wakanda"
          >
            dev.to
          </a>
          .
        </p>
      )}

      {state.kind === "ready" && state.articles.length === 0 && (
        <p className="text-silver">New posts are on the way.</p>
      )}

      {state.kind === "ready" && state.articles.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {state.articles.map((a) => (
            <a
              key={a.id}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-vibranium/20 bg-void-surface p-6 transition-colors duration-200 hover:border-vibranium/60"
            >
              <p className="text-xs text-silver-muted mb-2">
                {a.readable_publish_date} · {a.reading_time_minutes} min read
              </p>
              <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-vibranium-glow transition-colors duration-200">
                {a.title}
              </h3>
              <p className="text-silver leading-relaxed mb-4">{a.description}</p>
              <ul className="mt-auto flex flex-wrap gap-2">
                {toTags(a.tag_list)
                  .slice(0, 4)
                  .map((t) => (
                    <li
                      key={t}
                      className="rounded-md bg-void-hover px-2.5 py-1 text-xs text-silver"
                    >
                      #{t}
                    </li>
                  ))}
              </ul>
            </a>
          ))}
        </div>
      )}

      <p className="mt-10">
        <a
          href={devtoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-vibranium-glow hover:text-wakanda transition-colors duration-200"
        >
          Read everything on dev.to
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </p>
    </Section>
  );
};

export default Writing;
