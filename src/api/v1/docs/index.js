/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         token:
 *           type: string
 *           example: jwt_token_here
 *         user:
 *           $ref: '#/components/schemas/User'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Something went wrong
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Xác thực người dùng
 *   - name: User
 *     description: Quản lý user
 *   - name: Stock
 *     description: Cổ phiếu
 *   - name: Signal
 *     description: Tín hiệu giao dịch
 */