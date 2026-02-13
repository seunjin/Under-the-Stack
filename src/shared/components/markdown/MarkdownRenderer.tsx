import type * as React from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import { Badge, type BadgeProps } from '@/shared/components/ui/badge'
import { Callout, type CalloutProps } from '@/shared/components/ui/callout'
import { cn } from '@/shared/lib'

interface MarkdownRendererProps {
  content: string
  className?: string
}

/**
 * 전용 배지 컴포넌트의 프롭 타입입니다.
 */
interface CustomBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeProps['variant']
}

interface CustomCalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CalloutProps['variant']
  title?: string
  icon?: string
}

interface MarkdownComponents extends Components {
  badge?: React.ComponentType<CustomBadgeProps>
  callout?: React.ComponentType<CustomCalloutProps>
}

/**
 * 프로젝트 전체에서 사용되는 표준 마크다운 렌더러 컴포넌트입니다.
 * Tailwind Typography(prose) 테마와 하이브리드 컴포넌트(Badge 등)를 제공합니다.
 */
export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  const components: MarkdownComponents = {
    // 마크다운 내 <badge> 태그 지원
    badge: ({
      children,
      variant = 'secondary',
      className: badgeClassName,
      ...props
    }: CustomBadgeProps) => (
      <Badge
        variant={variant}
        className={cn('mx-0.5 text-[13px] py-0 font-bold', badgeClassName)}
        {...props}
      >
        {children}
      </Badge>
    ),
    code({
      className: codeClassName,
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement>) {
      const match = /language-(\w+)/.exec(codeClassName || '')
      const isInline = !codeClassName?.includes('language-')

      if (!isInline) {
        return (
          <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm w-full min-w-0 my-6">
            <div className="bg-neutral-50 px-4 py-1.5 border-b border-neutral-200 flex items-center justify-between">
              <span className="text-[10px]  text-neutral-500 uppercase tracking-wider">
                {match ? match[1] : 'code'}
              </span>
            </div>
            <SyntaxHighlighter
              language={match ? match[1] : 'javascript'}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                background: '#1e1e1e',
                width: '100%',
                borderRadius: '0',
                minWidth: 0,
              }}
              codeTagProps={{
                style: {
                  fontFamily: 'var(--font-mono)',
                },
              }}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </div>
        )
      }

      return (
        <code
          className={cn(
            ' text-[0.9em] font-bold text-primary bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200/50',
            codeClassName,
          )}
          {...props}
        >
          {children}
        </code>
      )
    },
    // 커스텀 <callout> 태그 지원
    callout: ({
      children,
      variant,
      title,
      icon,
      className: calloutClassName,
      ...props
    }: CustomCalloutProps) => (
      <Callout
        variant={variant}
        title={title}
        icon={icon}
        className={calloutClassName}
        {...props}
      >
        {children}
      </Callout>
    ),
    blockquote({
      children,
      className: qClassName,
    }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
      return (
        <blockquote
          className={cn(
            'my-8 pl-6 border-l-4 border-neutral-300 italic text-neutral-600 font-medium leading-relaxed',
            qClassName,
          )}
        >
          {children}
        </blockquote>
      )
    },
  }

  return (
    <div
      className={cn(
        'prose prose-neutral max-w-none w-full min-w-0 grid grid-cols-1',
        'prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground',
        'prose-h1:mt-12 prose-h1:mb-4 prose-h2:mt-10 prose-h2:mb-3 prose-h3:mt-8 prose-h3:mb-2 prose-h4:mt-6 prose-h4:mb-0.5 prose-h5:mt-4 prose-h5:mb-0.5',
        'prose-strong:text-primary prose-strong:font-bold ',
        'prose-p:text-foreground/90 prose-p:leading-relaxed',
        'prose-hr:border-neutral-200',
        'prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0',
        className,
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={components as Components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
