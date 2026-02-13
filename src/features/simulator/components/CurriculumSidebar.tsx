/**
 * CurriculumSidebar 컴포넌트
 * curriculum.ts에 정의된 로드맵을 바탕으로 사이드바 메뉴를 동적으로 생성합니다.
 * 각 레슨 클릭 시 해당 학습 페이지로 라우팅을 수행합니다.
 */
import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import { Activity, BookOpen, ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib'
import { getDeepDive } from '../data/deep-dives'
import { CURRICULUM } from '../lib/curriculum'
import type { LessonMeta } from '../lib/types'

interface SidebarRouteParams {
  id?: string
}

interface LessonNavButtonProps {
  lesson: LessonMeta
  isActive: boolean
  onClick: () => void
}

function LessonNavButton({ lesson, isActive, onClick }: LessonNavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group text-left',
        isActive
          ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
          : 'hover:bg-sidebar-accent/50 text-muted-foreground hover:text-foreground',
      )}
    >
      <div
        className={cn(
          'shrink-0 w-6 h-6 rounded flex items-center justify-center transition-colors',
          isActive
            ? 'bg-primary-foreground/20'
            : 'bg-muted/30 group-hover:bg-primary/20',
        )}
      >
        <Activity
          size={14}
          className={cn(
            isActive ? 'text-primary-foreground' : 'group-hover:text-primary',
            lesson.iconType === 'applied' && !isActive && 'text-blue-400',
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate leading-none">
          {lesson.title}
        </div>
      </div>
      <ChevronRight
        size={14}
        className={cn(
          'shrink-0 transition-transform duration-200',
          isActive
            ? 'translate-x-0'
            : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0',
        )}
      />
    </button>
  )
}

export function CurriculumSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams({ strict: false }) as SidebarRouteParams

  // 현재 위치가 딥다이브인 경우 연관된 레슨 ID를 찾아 하이라이팅 유지
  let currentLessonId = params.id
  if (location.pathname.startsWith('/deep-dive/') && params.id) {
    const deepDive = getDeepDive(params.id)
    if (deepDive) {
      currentLessonId = deepDive.lessonId
    }
  }

  // 진척도 계산 로직
  const totalLessons = CURRICULUM.reduce(
    (acc, track) =>
      acc + track.modules.reduce((mAcc, mod) => mAcc + mod.lessons.length, 0),
    0,
  )

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-border/50">
      <div className="p-6 border-b border-border/50 bg-sidebar-accent/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <BookOpen size={20} />
          </div>
          <h2 className="font-bold text-lg tracking-tight">Curriculum</h2>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          CS 기초 개념을 실제 웹 실무 환경과 <br />
          연결하는 <strong>시스템 사고</strong>를 훈련합니다.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {CURRICULUM.map((track) => (
          <div key={track.id} className="py-2">
            <div className="px-6 py-3 border-b border-border/10 bg-muted/5">
              <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
                {track.title}
              </span>
            </div>

            {track.modules.map((module) => (
              <div key={module.id} className="mt-2">
                <div className="px-6 mb-1">
                  <span className="text-[10px] font-bold text-muted-foreground/70 uppercase">
                    {module.title}
                  </span>
                </div>
                <div className="px-3 space-y-0.5">
                  {module.lessons.map((lesson) => (
                    <LessonNavButton
                      key={lesson.id}
                      lesson={lesson}
                      isActive={currentLessonId === lesson.id}
                      onClick={() => {
                        navigate({
                          to: '/lesson/$id',
                          params: { id: lesson.id },
                          search: { step: 0 },
                        })
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border/50 bg-sidebar-accent/20">
        <div className="p-3 rounded-lg bg-card border border-border/50 shadow-sm">
          <div className="text-[10px] text-muted-foreground uppercase mb-2">
            Learning Progress
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[7%]" />
          </div>
          <div className="mt-2 flex justify-between items-baseline">
            <span className="text-xs font-bold text-foreground">
              1 / {totalLessons}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {Math.round((1 / totalLessons) * 100)}% Complete
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
