// components/analytics/VisitorFunnelTable.tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Monitor,
  Tablet,
  CalendarDays,
  Users,
  Phone,
  MapPin,
  Clock,
  Glasses,
  RefreshCw,
  Search,
  X,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useGetAllTrackDataQuery } from "../../../app/redux/api/analyticsApi";

interface UserInfo {
  name?: string | null;
  phone?: string | null;
  address?: string | null;
}

interface SessionMetaData {
  name?: string | null;
  price?: string | null;
}

interface PageVisit {
  page: string;
  visits: number;
}

interface VisitorSession {
  sessionId: string;
  userInfo?: UserInfo;
  metaData?: SessionMetaData[];
  pageVisits: PageVisit[];
  lastActivity: string | number | Date;
  userAgent?: string;
}

interface DateGroup {
  _id: string;
  totalSessions: number;
  sessions: VisitorSession[];
}

interface ParsedDevice {
  type: "Mobile" | "Tablet" | "Desktop";
  os: string;
  browser: string;
}

interface ParsedMetaEntry {
  items: string[];
  prices: string[];
}

interface SelectedModalData {
  visitorLabel: string;
  phone?: string | null;
  entries: ParsedMetaEntry[];
}

const MAX_VISIBLE_ITEMS = 5;
const ITEMS_PER_PAGE = 20;

const parseMetaString = (raw?: string | null): string[] => {
  if (!raw) return [];
  return raw
    .split(",")
    .map((part: string) => part.trim())
    .filter((part: string) => !part.endsWith("not-added"));
};

const parseUserAgent = (ua?: string): ParsedDevice => {
  if (!ua) {
    return { type: "Desktop", os: "Unknown OS", browser: "Unknown Browser" };
  }

  let type: ParsedDevice["type"] = "Desktop";
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) {
    type = "Tablet";
  } else if (
    /Mobile|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  ) {
    type = "Mobile";
  }

  let os = "Unknown OS";
  if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser = "Browser";
  if (/FBAN|FBAV/i.test(ua)) browser = "Facebook In-App";
  else if (/Instagram/i.test(ua)) browser = "Instagram In-App";
  else if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(ua)) browser = "Opera";
  else if (/Chrome\//i.test(ua)) browser = "Chrome";
  else if (/Safari\//i.test(ua)) browser = "Safari";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";

  return { type, os, browser };
};

const DeviceIcon = ({ type }: { type: ParsedDevice["type"] }) => {
  if (type === "Mobile")
    return <Smartphone className="h-3.5 w-3.5 text-primary" />;
  if (type === "Tablet") return <Tablet className="h-3.5 w-3.5 text-primary" />;
  return <Monitor className="h-3.5 w-3.5 text-muted-foreground" />;
};

export default function VisitorFunnelTable() {
  const [page, setPage] = useState(1);
  const [dateInput, setDateInput] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [selectedModal, setSelectedModal] = useState<SelectedModalData | null>(
    null,
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllTrackDataQuery({
    page,
    limit: ITEMS_PER_PAGE,
    date: appliedDate || undefined,
  });

  const groupedDates: DateGroup[] = Array.isArray(response?.data)
    ? response.data
    : [];
  const hasMore = response?.meta?.hasMore ?? false;
  const totalSessions = response?.meta?.totalSessions ?? 0;

  // Infinite scroll observer
  useEffect(() => {
    const sentinel = loadMoreTriggerRef.current;
    const rootContainer = scrollContainerRef.current;
    if (!sentinel || !rootContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: rootContainer,
        rootMargin: "120px",
        threshold: 0.1,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isFetching, groupedDates.length]);

  const handleSearchByDate = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setAppliedDate(dateInput);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearSearch = () => {
    setDateInput("");
    setAppliedDate("");
    setPage(1);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRefresh = () => {
    if (page !== 1) {
      setPage(1);
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      refetch();
    }
  };

  return (
    <div className="m-2 space-y-4">
      {/* Top Filter & Refresh Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="font-medium">
            {appliedDate ? `Date: ${appliedDate}` : "Showing Last 5 Days"}
          </Badge>
          {totalSessions > 0 && (
            <span>
              ({totalSessions} total{" "}
              {totalSessions === 1 ? "session" : "sessions"})
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <form
            onSubmit={handleSearchByDate}
            className="flex items-center gap-2"
          >
            <Input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="h-8 w-[160px] text-xs"
            />
            <Button
              type="submit"
              size="sm"
              variant="secondary"
              disabled={!dateInput || isFetching}
              className="h-8 text-xs gap-1.5"
            >
              <Search className="h-3.5 w-3.5" />
              Search
            </Button>

            {appliedDate && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleClearSearch}
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                title="Back to last 5 days"
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
            )}
          </form>

          <div className="h-4 w-[1px] bg-border mx-1 hidden sm:block" />

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleRefresh}
            disabled={isFetching}
            className="h-8 text-xs gap-1.5"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* States */}
      {isLoading && page === 1 ? (
        <div className="p-6 text-sm text-muted-foreground flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading visitor funnel logs...
        </div>
      ) : isError ? (
        <div className="p-6 text-sm text-destructive">
          Failed to load tracking data.
        </div>
      ) : groupedDates.length === 0 ? (
        <div className="p-6 text-sm text-muted-foreground rounded-lg border border-dashed text-center">
          {appliedDate
            ? `No visitor tracking records found for ${appliedDate}.`
            : "No visitor tracking records found in the last 5 days."}
        </div>
      ) : (
        /* Scrollable Container */
        <div
          ref={scrollContainerRef}
          className="space-y-6 max-h-[calc(100vh-185px)] overflow-y-auto no-scrollbar pb-10"
        >
          {groupedDates.map((dateGroup, index) => (
            <motion.div
              key={dateGroup._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: Math.min(index * 0.05, 0.2),
              }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-4 bg-muted/40">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    Date: {dateGroup._id}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1.5"
                  >
                    <Users className="h-3.5 w-3.5" />
                    {dateGroup.totalSessions}{" "}
                    {dateGroup.totalSessions === 1 ? "Visitor" : "Visitors"}
                  </Badge>
                </CardHeader>

                <CardContent className="p-0">
                  <Table className="no-scrollbar">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[220px]">
                          Visitor / Lead Info
                        </TableHead>
                        <TableHead className="w-[180px]">Device Info</TableHead>
                        <TableHead>Page Visits Breakdown</TableHead>
                        <TableHead>Selected Frame & Lens</TableHead>
                        <TableHead className="text-right">
                          Last Active
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dateGroup.sessions.map((session) => {
                        const device = parseUserAgent(session.userAgent);
                        const validMetaEntries: ParsedMetaEntry[] =
                          Array.isArray(session.metaData)
                            ? session.metaData
                                .map((meta) => ({
                                  items: parseMetaString(meta?.name),
                                  prices: parseMetaString(meta?.price),
                                }))
                                .filter(
                                  (entry) =>
                                    entry.items.length > 0 ||
                                    entry.prices.length > 0,
                                )
                            : [];

                        const visibleEntries = validMetaEntries.slice(
                          0,
                          MAX_VISIBLE_ITEMS,
                        );
                        const remainingCount =
                          validMetaEntries.length - MAX_VISIBLE_ITEMS;

                        return (
                          <TableRow key={session.sessionId}>
                            {/* 1. Customer Lead Info or Anonymous Session */}
                            <TableCell className="align-top">
                              {session.userInfo?.name ||
                              session.userInfo?.phone ? (
                                <div className="space-y-1">
                                  <p className="font-medium text-sm">
                                    {session.userInfo.name || "Unnamed Lead"}
                                  </p>
                                  {session.userInfo.phone && (
                                    <p className="text-xs font-mono text-primary font-semibold flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {session.userInfo.phone}
                                    </p>
                                  )}
                                  {session.userInfo.address && (
                                    <p className="text-xs text-muted-foreground line-clamp-2 flex items-start gap-1">
                                      <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                                      <span>{session.userInfo.address}</span>
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <Badge
                                    variant="outline"
                                    className="font-mono text-xs"
                                  >
                                    Guest Visitor
                                  </Badge>
                                  <p className="text-xs text-muted-foreground font-mono">
                                    {session.sessionId.slice(0, 14)}...
                                  </p>
                                </div>
                              )}
                            </TableCell>

                            {/* 2. Parsed Device Info */}
                            <TableCell
                              className="align-top"
                              title={session.userAgent || "Unknown User Agent"}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-xs font-medium">
                                  <DeviceIcon type={device.type} />
                                  <span>{device.type}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {device.os} • {device.browser}
                                </p>
                              </div>
                            </TableCell>

                            {/* 3. Page Visit Counts */}
                            <TableCell className="align-top">
                              <div className="flex flex-wrap gap-1.5">
                                {session.pageVisits.map((pv) => (
                                  <Badge
                                    key={pv.page}
                                    variant={
                                      pv.page === "Checkout"
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {pv.page}:{" "}
                                    <span className="ml-1 font-bold">
                                      {pv.visits}
                                    </span>
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>

                            {/* 4. Frame / Lens Selection */}
                            <TableCell className="align-top text-xs space-y-2">
                              {validMetaEntries.length > 0 ? (
                                <>
                                  {visibleEntries.map((entry, idx) => (
                                    <div
                                      key={idx}
                                      className="border-l-2 border-primary/40 pl-2 py-0.5 space-y-0.5"
                                    >
                                      {entry.items.length > 0 && (
                                        <div className="font-medium">
                                          {entry.items.join(" | ")}
                                        </div>
                                      )}
                                      {entry.prices.length > 0 && (
                                        <div className="text-muted-foreground">
                                          {entry.prices.join(" | ")}
                                        </div>
                                      )}
                                    </div>
                                  ))}

                                  {remainingCount > 0 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setSelectedModal({
                                          visitorLabel:
                                            session.userInfo?.name ||
                                            `Guest (${session.sessionId.slice(0, 10)}...)`,
                                          phone: session.userInfo?.phone,
                                          entries: validMetaEntries,
                                        })
                                      }
                                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline pt-1 cursor-pointer"
                                    >
                                      +{remainingCount} more{" "}
                                      {remainingCount === 1 ? "item" : "items"}
                                      ...
                                    </button>
                                  )}
                                </>
                              ) : (
                                <span className="text-muted-foreground italic">
                                  No frame/lens added yet
                                </span>
                              )}
                            </TableCell>

                            {/* 5. Last Activity Timestamp */}
                            <TableCell className="align-top text-right text-xs text-muted-foreground whitespace-nowrap">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(
                                  session.lastActivity,
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Bottom Scroll Sentinel */}
          <div
            ref={loadMoreTriggerRef}
            className="py-4 flex items-center justify-center text-xs text-muted-foreground"
          >
            {isFetching && page > 1 ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                Loading 20 more visitors...
              </span>
            ) : hasMore ? (
              <span>Scroll down to load more</span>
            ) : (
              <span>All records loaded</span>
            )}
          </div>
        </div>
      )}

      {/* Modal for viewing all items when > 5 */}
      <Dialog
        open={Boolean(selectedModal)}
        onOpenChange={(open) => {
          if (!open) setSelectedModal(null);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Glasses className="h-4 w-4 text-primary" />
              All Viewed & Selected Items ({selectedModal?.entries.length || 0})
            </DialogTitle>
            <DialogDescription className="text-xs">
              Visitor:{" "}
              <span className="font-medium text-foreground">
                {selectedModal?.visitorLabel}
              </span>
              {selectedModal?.phone && (
                <span className="ml-2 font-mono text-primary">
                  ({selectedModal.phone})
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto no-scrollbar space-y-2.5 pr-1">
            {selectedModal?.entries.map((entry, idx) => (
              <div
                key={idx}
                className="rounded-md border bg-muted/30 p-3 text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    #{idx + 1}
                  </Badge>
                </div>
                {entry.items.length > 0 && (
                  <p className="font-medium text-foreground">
                    {entry.items.join(" | ")}
                  </p>
                )}
                {entry.prices.length > 0 && (
                  <p className="text-muted-foreground">
                    {entry.prices.join(" | ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
