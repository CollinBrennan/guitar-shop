import { authProcedure, router } from '../lib/trpc.ts'

const sessionRouter = router({
  get: authProcedure.query(({ ctx }) => ctx.session),
})

export default sessionRouter
