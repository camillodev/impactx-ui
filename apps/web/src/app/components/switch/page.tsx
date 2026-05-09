"use client"

import { useState } from "react"
import { Switch, CodeBlock } from "@impactx/ds-education"

export default function SwitchPage() {
  const [isChecked, setIsChecked] = useState(false)
  const [isCheckedDefault, setIsCheckedDefault] = useState(true)

  return (
    <main className="min-h-screen bg-[var(--color-surface)] p-10">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-8">Switch</h1>

      <section className="mb-10">
        <h2 className="text-sm font-medium text-[var(--color-text)] mb-4 uppercase tracking-wide">
          Default
        </h2>
        <div className="flex items-center gap-4">
          <Switch />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-sm font-medium text-[var(--color-text)] mb-4 uppercase tracking-wide">
          Checked by default
        </h2>
        <div className="flex items-center gap-4">
          <Switch defaultChecked />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-sm font-medium text-[var(--color-text)] mb-4 uppercase tracking-wide">
          Disabled
        </h2>
        <div className="flex items-center gap-4">
          <Switch disabled />
          <Switch defaultChecked disabled />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-sm font-medium text-[var(--color-text)] mb-4 uppercase tracking-wide">
          With label
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Switch
              id="notifications"
              checked={isChecked}
              onCheckedChange={setIsChecked}
            />
            <label
              htmlFor="notifications"
              className="text-[var(--color-text)] cursor-pointer"
            >
              Enable notifications
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="emails"
              defaultChecked
              checked={isCheckedDefault}
              onCheckedChange={setIsCheckedDefault}
            />
            <label
              htmlFor="emails"
              className="text-[var(--color-text)] cursor-pointer"
            >
              Receive emails
            </label>
          </div>
        </div>
      </section>

      <section className="mb-10 max-w-3xl">
        <h2 className="text-xl font-medium text-[var(--color-text)] mb-4">Uso</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Básico</p>
            <CodeBlock language="tsx">{`import { Switch } from "@impactx/ds-education"

<Switch />`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Checked by default</p>
            <CodeBlock language="tsx">{`<Switch defaultChecked />`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Disabled</p>
            <CodeBlock language="tsx">{`<Switch disabled />
<Switch defaultChecked disabled />`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2">Com label</p>
            <CodeBlock language="tsx">{`import { Switch } from "@impactx/ds-education"
import { useState } from "react"

export default function Example() {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <Switch 
        id="notifications"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <label htmlFor="notifications">Enable notifications</label>
    </div>
  )
}`}</CodeBlock>
          </div>
        </div>
      </section>
    </main>
  )
}
