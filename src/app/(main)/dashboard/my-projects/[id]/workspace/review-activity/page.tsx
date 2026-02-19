"use client";
import React from "react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  GitCommit,
  GitPullRequest,
  AlertTriangle,
  ExternalLink,
  Activity,
} from "lucide-react";
import { Doc, Id } from "../../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../../convex/_generated/api";
import { LuActivity, LuGitGraph, LuGitPullRequest, LuLayers3 } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Review = Doc<"reviews">;
type Issue = Doc<"issues">;
type Project = Doc<"projects">;

const ReviewItem = ({ review }: { review: Review }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="mb-6 overflow-hidden border-border/40 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 transition-all duration-500 group/card p-0">
      <div className="p-5 flex flex-col gap-5">
        {/* 1. Top: Push Event with Icon */}
        <div className="flex items-center gap-3 pb-2 border-b border-border/10">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover/card:scale-110 transition-transform">
            {review.reviewType === "commit" ? (
              <GitCommit className="w-5 h-5" />
            ) : (
              <GitPullRequest className="w-5 h-5" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground/80 uppercase">
              {review.reviewType === "commit" ? "Push Event" : "Pull Request"}
            </span>
            <span className="text-xs font-mono text-muted-foreground truncate max-w-[200px]">
              {review.commitHash || review.pushTitle}
            </span>
          </div>
        </div>

        {/* 2. Below: Action done by image and author name */}
        <div className="flex items-center justify-between px-6 gap-4">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12 ring-2 ring-border/50 ring-offset-2 ring-offset-background group-hover/card:ring-primary/30 transition-all">
              <AvatarImage
                src={review.authorAvatar}
                alt={review.authorUserName}
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold">
                {review.authorUserName?.substring(0, 2).toUpperCase() || "AI"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium">
                Action done by
              </span>
              <span className="text-base font-semibold text-foreground group-hover/card:text-primary transition-colors">
                {review.authorUserName || "System Agent"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {review.reviewStatus === "completed" ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 text-green-600 border border-green-500/20 text-xs  animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Review Completed</span>
              </div>
            ) : review.reviewStatus === "failed" ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-600 border border-red-500/20 text-sm font-medium">
                <AlertCircle className="w-4 h-4" />
                <span>Review Failed</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 text-sm font-medium">
                <Clock className="w-4 h-4 animate-spin-slow" />
                <span>Analysis in Progress</span>
              </div>
            )}
          </div>
        </div>

        {/* 4. Issue found? Interactive UI */}
        {review.ctiticalIssueFound && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 p-2 rounded-xl bg-destructive/5 border border-destructive/20 cursor-help"
          >
            <div className=" text-destructive animate-pulse">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-destructive">
                Critical Issue Found
              </span>
              <span className="text-xs text-muted-foreground">
                Potential bug or security risk detected in this push.
              </span>
            </div>
          </motion.div>
        )}

        {/* 5. Created this at? (using fns to format)
        <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
          <Clock className="w-3 h-3" />
          <span>
            Created at{" "}
            {format(
              review._creationTime || review.createdAt,
              "MMMM do, yyyy 'at' h:mm:ss a",
            )}
          </span>
        </div> */}

        {/* 6. Toggle button to show the review! with interactive ui */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={isOpen ? "outline" : "default"}
            className={cn(
              "flex-1 justify-between h-11 transition-all duration-300 shadow-md",
              !isOpen &&
                "bg-primary hover:bg-primary/90 hover:translate-y-[-2px] hover:shadow-primary/20",
              isOpen && "bg-background border-primary/20",
            )}
          >
            <span className="flex items-center gap-2 font-semibold">
              <LuActivity
                className={cn("w-4 h-4", isOpen && "animate-pulse")}
              />
              {isOpen ? "Collapse Deep Analysis" : "View AI Review Report"}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </Button>

          {review.pushUrl && (
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-md hover:bg-primary/10 hover:border-primary/30"
              asChild
              title="View on GitHub"
            >
              <a
                href={review.pushUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="View on GitHub"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </a>
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="overflow-hidden bg-zinc-50 dark:bg-zinc-950/50 border-t border-border/10"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-primary rounded-full" />
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                  AI Analysis Report
                </h4>
              </div>
              <Message from="assistant" className="max-w-full">
                <MessageContent className="bg-transparent text-sm leading-relaxed p-0">
                  <MessageResponse className="prose dark:prose-invert prose-sm">
                    {review.review}
                  </MessageResponse>
                </MessageContent>
              </Message>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const ActivityFeed = () => {
  const { id } = useParams(); // this contains the id of the project
  const projectId = id as Id<"projects">;
  const project = useQuery(api.projects.getProjectById, {
    projectId: projectId,
  });

  const reviews = useQuery(api.repos.getReviewsByRepoId, {
    repoId: project?.repositoryId!,
  });

  const issues = useQuery(api.repos.getIssuesByRepoId, {
    repoId: project?.repositoryId!,
  });

  // Loading state
  if (reviews === undefined || issues === undefined) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Repository Activity</h1>
          <p className="text-gray-600">Syncing latest events...</p>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-accent/50 rounded-xl"></div>
          <div className="h-32 bg-accent/50 rounded-xl"></div>
          <div className="h-32 bg-accent/50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 w-full h-full bg-slate-50/50 dark:bg-zinc-950">
      <div className="flex items-center justify-between mb-2">
        <div className="">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Review & Automation
            </h1>
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 shadow-sm border border-blue-600/20">
              <LuActivity className="w-5 h-5 inline" />
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-2">
            Monitor Project workflows in form of commits/Pr/issues for{" "}
            <span className="text-foreground font-medium">
              {project?.projectName}
            </span>
          </p>
        </div>

        <div className="flex gap-10">
          <Button size='sm' className="cursor-pointer">View Repo Tree <LuGitGraph className="inline ml-1.5" /></Button>
          <Button size='sm' className="cursor-pointer">Visit workspace<LuLayers3 className="inline ml-1.5" /></Button>
        </div>
      </div>

      {/* <Separator className="" /> */}

      {/* Main Grid: Reviews on Left, Issues on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* LEFT SIDE: REVIEWS */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <LuGitPullRequest className="inline mr-1.5" /> Reviews
              <Badge
                variant="secondary"
                className="rounded-full px-2 py-0 h-5 text-xs"
              >
                {reviews?.length || 0}
              </Badge>
            </h2>
          </div>

          <div className="flex flex-col">
            {reviews?.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border/50 rounded-2xl bg-muted/30">
                <GitCommit className="w-12 h-12 text-muted-foreground opacity-20 mb-4" />
                <p className="text-muted-foreground font-medium">
                  No reviews yet
                </p>
                <p className="text-sm text-muted-foreground/60 text-center">
                  New activity will appear here automatically.
                </p>
              </div>
            ) : (
              reviews?.map((review) => (
                <ReviewItem key={review._id} review={review} />
              ))
            )}
          </div>
        </div>

        {/* RIGHT SIDE: ISSUES */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              System Issues
              <Badge
                variant="secondary"
                className="rounded-full px-2 py-0 h-5 text-xs"
              >
                {issues?.length || 0}
              </Badge>
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {issues?.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border/50 rounded-2xl bg-muted/30">
                <AlertCircle className="w-12 h-12 text-muted-foreground opacity-20 mb-4" />
                <p className="text-muted-foreground font-medium">
                  Clean slate!
                </p>
                <p className="text-sm text-muted-foreground/60 text-center">
                  No critical issues detected in recent activity.
                </p>
              </div>
            ) : (
              issues?.map((issue) => (
                <div
                  key={issue._id}
                  className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm"
                >
                  {/* Issue UI can be further refined here if needed */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      className={cn(
                        "gap-1",
                        issue.issueStatus === "resolved"
                          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                          : "bg-red-500/10 text-red-500 hover:bg-red-500/20",
                      )}
                    >
                      {issue.issueStatus}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(issue.issueCreatedAt, "MMM d, HH:mm")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {issue.issueTitle}
                  </h3>
                  <Message from="assistant">
                    <MessageContent className="text-sm">
                      <MessageResponse>
                        {issue.issueDescription}
                      </MessageResponse>
                    </MessageContent>
                  </Message>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;

{
  /* <div className="max-w-3xl border-t my-5">
        <h2 className="text-xl font-bold">Issues</h2>
        {issues?.map((issue) => (
          <div className="bg-muted p-4">
            <p>Issue Status: {issue?.issueStatus}</p>
            <p>Issue Title: {issue?.issueTitle}</p>
            <p>Issue Type: {issue?.issueType}</p>
            <p>Issue File: {issue?.issueFiles}</p>
            <p>Issue assigned to {issue?.issueAssignedTo || "Unassigned"}</p>

            <Message key={issue._id} from="assistant">
              <MessageContent>
                <MessageResponse>{issue.issueDescription}</MessageResponse>
              </MessageContent>
            </Message>
          </div>
        ))}
      </div> */
}