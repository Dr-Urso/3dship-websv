package cmd

import (
	_ "shipmgr/internal/logic"

	"context"
	"shipmgr/internal/controller/part"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
	"github.com/gogf/gf/v2/os/gcmd"
)

var (
	Main = gcmd.Command{
		Name:  "main",
		Usage: "main",
		Brief: "start http server",
		Func: func(ctx context.Context, parser *gcmd.Parser) (err error) {
			s := g.Server()

			s.Group("/", func(group *ghttp.RouterGroup) {
				group.Middleware(ghttp.MiddlewareHandlerResponse)
				var (
					shipMgr = part.NewV1()
				)
				group.Bind(shipMgr)
			})
			s.Run()
			return nil
		},
	}
)
