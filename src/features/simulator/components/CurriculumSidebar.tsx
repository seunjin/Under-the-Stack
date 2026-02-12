/**
 * CurriculumSidebar 컴포넌트
 * curriculum.ts에 정의된 로드맵을 바탕으로 사이드바 메뉴를 동적으로 생성합니다.
 * 각 레슨 클릭 시 해당 학습 페이지로 라우팅을 수행합니다.
 */
import { useNavigate } from '@tanstack/react-router'
import { lessonRoute } from '@/shared/lib/router'
import { CURRICULUM } from '../lib/curriculum'
import { cn } from '@/shared/lib'
import { BookOpen, ChevronRight, PlayCircle } from 'lucide-react'

export function CurriculumSidebar() {
    const navigate = useNavigate()
    const { id: currentLessonId } = lessonRoute.useParams()

    // 진척도 계산 로직 (임시)
    const totalLessons = CURRICULUM.reduce((acc, section) => acc + section.lessons.length, 0)

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
                    자료구조와 알고리즘의 기초부터 <br />실무 응용까지 체계적으로 학습합니다.
                </p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {CURRICULUM.map((section) => (
                    <div key={section.id} className="py-4">
                        <div className="px-6 mb-2 flex items-center justify-between group">
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                                {section.title}
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                {section.lessons.length} Lessons
                            </span>
                        </div>

                        <div className="px-3 space-y-0.5">
                            {section.lessons.map((lesson) => {
                                const isActive = currentLessonId === lesson.id

                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => {
                                            navigate({
                                                to: '/lesson/$id',
                                                params: { id: lesson.id },
                                                search: { step: 0 },
                                            })
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group text-left",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                                : "hover:bg-sidebar-accent/50 text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <div className={cn(
                                            "shrink-0 w-6 h-6 rounded flex items-center justify-center transition-colors",
                                            isActive ? "bg-primary-foreground/20" : "bg-muted/30 group-hover:bg-primary/20"
                                        )}>
                                            <PlayCircle size={14} className={isActive ? "text-primary-foreground" : "group-hover:text-primary"} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold truncate leading-none mb-1">
                                                {lesson.title}
                                            </div>
                                            <div className="text-[10px] font-mono opacity-60">
                                                {lesson.duration}
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className={cn(
                                            "shrink-0 transition-transform duration-200",
                                            isActive ? "translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                        )} />
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-border/50 bg-sidebar-accent/20">
                <div className="p-3 rounded-lg bg-card border border-border/50 shadow-sm">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase mb-2">Progress</div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[15%]" />
                    </div>
                    <div className="mt-2 flex justify-between items-baseline">
                        <span className="text-xs font-bold text-foreground">1 / {totalLessons}</span>
                        <span className="text-[10px] text-muted-foreground">{Math.round((1 / totalLessons) * 100)}% Complete</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
