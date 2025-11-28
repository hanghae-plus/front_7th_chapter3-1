import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";

describe("다크모드", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("light", "dark");
  });

  it("다크모드 토글 버튼이 렌더링된다", () => {
    render(<App />);
    const themeToggle = screen.getByLabelText("Toggle theme");
    expect(themeToggle).toBeInTheDocument();
  });

  it("초기 상태는 라이트 모드이다", () => {
    render(<App />);
    // localStorage가 비어있으면 light가 기본값
    expect(document.documentElement).toHaveClass("light");
  });

  it("토글 버튼 클릭 시 다크모드로 전환된다", async () => {
    const user = userEvent.setup();
    render(<App />);

    const themeToggle = screen.getByLabelText("Toggle theme");
    await user.click(themeToggle);

    await waitFor(() => {
      expect(document.documentElement).toHaveClass("dark");
      expect(document.documentElement).not.toHaveClass("light");
    });
  });

  it("다크모드 상태가 localStorage에 저장된다", async () => {
    const user = userEvent.setup();
    render(<App />);

    const themeToggle = screen.getByLabelText("Toggle theme");
    await user.click(themeToggle);

    await waitFor(() => {
      expect(localStorage.getItem("theme")).toBe("dark");
    });
  });

  it("다크모드를 다시 토글하면 라이트모드로 돌아온다", async () => {
    const user = userEvent.setup();
    render(<App />);

    const themeToggle = screen.getByLabelText("Toggle theme");

    // 다크모드로 전환
    await user.click(themeToggle);
    await waitFor(() => {
      expect(document.documentElement).toHaveClass("dark");
    });

    // 라이트모드로 다시 전환
    await user.click(themeToggle);
    await waitFor(() => {
      expect(document.documentElement).toHaveClass("light");
      expect(document.documentElement).not.toHaveClass("dark");
    });
  });

  it("localStorage에 저장된 테마가 초기 렌더링에 반영된다", () => {
    // 미리 다크모드 설정
    localStorage.setItem("theme", "dark");

    render(<App />);

    // 다크모드가 자동으로 적용되어야 함
    expect(document.documentElement).toHaveClass("dark");
  });
});

