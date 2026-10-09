"use client";

import axios, { isAxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChatbotUserRow } from "../overview/chatsOverviewUtils";
import {
  buildUserIdToUsernameMap,
  displayUsernameFromSeed,
} from "../overview/chatsOverviewUtils";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

type UsersResponse = {
  chatbot_users?: ChatbotUserRow[];
};

export default function ChatsHistoryPage() {
  const [users, setUsers] = useState<ChatbotUserRow[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setUsersLoading(true);
    setUsersError(null);

    axios
      .get<UsersResponse>("/api/chatting/get/all-users")
      .then(({ data }) => {
        if (cancelled) return;
        const list = data.chatbot_users;
        setUsers(Array.isArray(list) ? list : []);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = isAxiosError(err)
          ? String(err.response?.data ?? err.message)
          : "Could not load users";
        setUsersError(msg);
        setUsers([]);
      })
      .finally(() => {
        if (!cancelled) setUsersLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const nameMap = useMemo(() => buildUserIdToUsernameMap(users), [users]);

  const headerTitle = useMemo(() => {
    if (selectedId == null) return "";
    const u = users.find(
      (x) => typeof x.id === "number" && x.id === selectedId,
    );
    if (!u || typeof u.id !== "number") return `User ${selectedId}`;
    const seed =
      typeof u.user_id === "string" && u.user_id.length > 0
        ? u.user_id
        : String(u.id);
    return nameMap.get(u.id) ?? displayUsernameFromSeed(seed);
  }, [selectedId, users, nameMap]);

  const onSelectUser = useCallback((user: ChatbotUserRow) => {
    if (typeof user.id !== "number") return;
    setSelectedId(user.id);
  }, []);

  return (
    <div className="flex h-[min(720px,calc(100dvh-8rem))] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm shadow-slate-200/50 ring-1 ring-slate-100">
      <div className="w-full max-w-[380px] shrink-0 min-w-[260px]">
        <LeftSide
          users={users}
          selectedId={selectedId}
          onSelect={onSelectUser}
          loading={usersLoading}
          error={usersError}
        />
      </div>
      <RightSide userId={selectedId} headerTitle={headerTitle} />
    </div>
  );
}
